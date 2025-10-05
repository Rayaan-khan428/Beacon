import SwiftUI
import CoreLocation
import MapKit

struct ContentView: View {
    @State private var selectedTab: Tab = .question
    @State private var userMessage: String = ""
    @State private var compressedMessage: String = ""
    @State private var charactersSaved: Int = 0
    @State private var showingInstructions: Bool = false
    @State private var phoneNumber: String = ""
    
    // Your Twilio number - REPLACE WITH YOUR ACTUAL NUMBER
    let twilioNumber = "+15794010314"
    
    enum Tab {
        case weather
        case question
        case fireAlert
        case settings
    }
    
    var body: some View {
        ZStack(alignment: .bottom) {
            // Main Content
            Group {
                switch selectedTab {
                case .weather:
                    WeatherView()
                        .transition(.asymmetric(
                            insertion: .move(edge: .leading).combined(with: .opacity),
                            removal: .move(edge: .trailing).combined(with: .opacity)
                        ))
                case .question:
                    QuestionView(
                        userMessage: $userMessage,
                        compressedMessage: $compressedMessage,
                        charactersSaved: $charactersSaved,
                        showingInstructions: $showingInstructions,
                        twilioNumber: twilioNumber,
                        compressMessage: compressMessage,
                        sendSMS: sendSMS
                    )
                    .transition(.opacity)
                case .fireAlert:
                    FireAlertView(twilioNumber: twilioNumber)
                        .transition(.opacity)
                case .settings:
                    SettingsView(twilioNumber: twilioNumber)
                        .transition(.asymmetric(
                            insertion: .move(edge: .trailing).combined(with: .opacity),
                            removal: .move(edge: .leading).combined(with: .opacity)
                        ))
                }
            }
            .animation(.easeInOut(duration: 0.3), value: selectedTab)
            .padding(.bottom, 90) // Space for bottom nav
            
            // Bottom Navigation
            PillNavigationBar(selectedTab: $selectedTab)
        }
        .ignoresSafeArea(.keyboard)
    }
    
    // MARK: - Helper Functions
    
    // Compression function
    func compressMessage() {
        let replacements: [String: String] = [
            "temperature": "temp",
            "degrees": "°",
            "fahrenheit": "F",
            "celsius": "C",
            "weather": "wx",
            "forecast": "fcst",
            "precipitation": "precip",
            "humidity": "humid",
            "kilometers": "km",
            "meters": "m",
            "miles": "mi",
            "emergency": "emerg",
            "medical": "med",
            "hospital": "hosp",
            "should": "shld",
            "would": "wld",
            "could": "cld",
            "minute": "min",
            "hour": "hr",
            "second": "sec",
            "north": "N",
            "south": "S",
            "east": "E",
            "west": "W",
            "approximately": "~",
            "between": "btwn",
            "without": "w/o",
            "with": "w/",
            "and": "&",
            "you": "u",
            "your": "ur",
            "are": "r",
            "to": "2",
            "for": "4",
            "at": "@"
        ]
        
        var compressed = userMessage
        
        // Apply replacements (case-insensitive)
        for (full, abbrev) in replacements {
            let regex = try? NSRegularExpression(pattern: "\\b\(full)\\b", options: .caseInsensitive)
            if let regex = regex {
                let range = NSRange(compressed.startIndex..., in: compressed)
                compressed = regex.stringByReplacingMatches(
                    in: compressed,
                    range: range,
                    withTemplate: abbrev
                )
            }
        }
        
        // Remove extra spaces
        compressed = compressed.components(separatedBy: .whitespaces)
            .filter { !$0.isEmpty }
            .joined(separator: " ")
        
        // Truncate if too long
        if compressed.count > 160 {
            compressed = String(compressed.prefix(157)) + "..."
        }
        
        compressedMessage = compressed
        charactersSaved = userMessage.count - compressed.count
    }
    
    // Send SMS function
    func sendSMS() {
        let sms = "sms:\(twilioNumber)&body=\(compressedMessage.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? "")"
        if let url = URL(string: sms) {
            UIApplication.shared.open(url)
        }
    }
}

// Instructions View
struct InstructionsView: View {
    let twilioNumber: String
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    Text("About Satellite AI")
                        .font(.custom("Manrope-Bold", size: 22))
                    
                    Text("Satellite AI provides emergency intelligence when cellular networks fail. Perfect for:")
                        .font(.body)
                    
                    VStack(alignment: .leading, spacing: 10) {
                        Label("Backcountry hiking & camping", systemImage: "mountain.2.fill")
                        Label("Maritime emergencies", systemImage: "water.waves")
                        Label("Disaster response", systemImage: "exclamationmark.triangle.fill")
                        Label("Remote expeditions", systemImage: "figure.hiking")
                    }
                    .font(.subheadline)
                    
                    Divider()
                    
                    Text("Features")
                        .font(.custom("Manrope-Bold", size: 22))
                    
                    VStack(alignment: .leading, spacing: 12) {
                        FeatureRow(icon: "cloud.sun.fill", title: "Weather Updates", description: "Get real-time weather by coordinates")
                        FeatureRow(icon: "brain.head.profile", title: "AI Assistance", description: "Emergency medical, survival, navigation advice")
                        FeatureRow(icon: "arrow.down.circle.fill", title: "Smart Compression", description: "Optimizes messages for satellite limits")
                    }
                    
                    Divider()
                    
                    Text("How to Use")
                        .font(.custom("Manrope-Bold", size: 22))
                    
                    Text("1. Type your question or request\n2. App compresses it automatically\n3. Send to: \(twilioNumber)\n4. Receive compressed AI response")
                        .font(.body)
                    
                    Divider()
                    
                    Text("Example Queries")
                        .font(.custom("Manrope-Bold", size: 22))
                    
                    VStack(alignment: .leading, spacing: 8) {
                        ExampleQuery(text: "weather 37.7749, -122.4194")
                        ExampleQuery(text: "snake bite first aid")
                        ExampleQuery(text: "how to purify water")
                        ExampleQuery(text: "hypothermia symptoms")
                    }
                }
                .padding()
            }
            .navigationTitle("Instructions")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                }
            }
        }
    }
}

struct FeatureRow: View {
    let icon: String
    let title: String
    let description: String
    
    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(.blue)
                .frame(width: 30)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.headline)
                Text(description)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }
        }
    }
}

struct ExampleQuery: View {
    let text: String
    
    var body: some View {
        Text("• \(text)")
            .font(.subheadline)
            .padding(.vertical, 4)
            .padding(.horizontal, 12)
            .background(Color(.systemGray6))
            .cornerRadius(8)
    }
}

// MARK: - Pill Navigation Bar
struct PillNavigationBar: View {
    @Binding var selectedTab: ContentView.Tab
    
    var body: some View {
        HStack(spacing: 0) {
            NavButton(title: "Weather", icon: "cloud.sun.fill", isSelected: selectedTab == .weather) {
                selectedTab = .weather
            }
            
            NavButton(title: "Question", icon: "message.fill", isSelected: selectedTab == .question) {
                selectedTab = .question
            }
            
            NavButton(title: "Fire Alert", icon: "flame.fill", isSelected: selectedTab == .fireAlert) {
                selectedTab = .fireAlert
            }
            
            NavButton(title: "Settings", icon: "gearshape.fill", isSelected: selectedTab == .settings) {
                selectedTab = .settings
            }
        }
        .padding(.horizontal, 8)
        .padding(.vertical, 8)
        .background(
            ZStack {
                Color(.systemBackground)
                
                // Subtle gradient overlay
                LinearGradient(
                    gradient: Gradient(colors: [
                        Color.blue.opacity(0.03),
                        Color.blue.opacity(0.01)
                    ]),
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            }
        )
        .cornerRadius(30)
        .overlay(
            RoundedRectangle(cornerRadius: 30)
                .stroke(
                    LinearGradient(
                        gradient: Gradient(colors: [
                            Color.blue.opacity(0.2),
                            Color.blue.opacity(0.1)
                        ]),
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ),
                    lineWidth: 1
                )
        )
        .shadow(color: .blue.opacity(0.08), radius: 12, x: 0, y: -3)
        .shadow(color: .black.opacity(0.05), radius: 8, x: 0, y: -2)
        .padding(.horizontal, 20)
        .padding(.bottom, 10)
    }
}

struct NavButton: View {
    let title: String
    let icon: String
    let isSelected: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: {
            withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
                action()
            }
        }) {
            VStack(spacing: 4) {
                Image(systemName: icon)
                    .font(.system(size: 20))
                    .scaleEffect(isSelected ? 1.1 : 1.0)
                Text(title)
                    .font(.caption)
                    .fontWeight(isSelected ? .semibold : .medium)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 8)
            .background(
                RoundedRectangle(cornerRadius: 20)
                    .fill(isSelected ? Color.blue : Color.clear)
            )
            .foregroundColor(isSelected ? .white : .gray)
        }
        .animation(.spring(response: 0.3, dampingFraction: 0.7), value: isSelected)
    }
}

// MARK: - Weather View
struct WeatherView: View {
    @StateObject private var locationManager = LocationManager()
    @State private var latitude: String = ""
    @State private var longitude: String = ""
    @State private var isLoadingLocation: Bool = false
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 20) {
                    // Header
                    VStack(spacing: 8) {
                        Image(systemName: "cloud.sun.fill")
                            .font(.system(size: 60))
                            .foregroundColor(.blue)
                        
                        Text("Weather by Coordinates")
                            .font(.custom("Manrope-Bold", size: 28))
                        
                        Text("Get weather info for any location")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                            .multilineTextAlignment(.center)
                    }
                    .padding(.top, 20)
                    
                    // Use Current Location Button
                    Button(action: {
                        isLoadingLocation = true
                        locationManager.requestLocation()
                    }) {
                        HStack {
                            if isLoadingLocation && locationManager.location == nil {
                                ProgressView()
                                    .progressViewStyle(CircularProgressViewStyle(tint: .white))
                                    .scaleEffect(0.8)
                            } else {
                                Image(systemName: "location.fill")
                            }
                            Text("Use My Current Location")
                        }
                        .font(.headline)
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.green)
                        .cornerRadius(12)
                    }
                    .padding(.horizontal)
                    .disabled(isLoadingLocation && locationManager.location == nil)
                    
                    // Location status message
                    if let error = locationManager.errorMessage {
                        Text(error)
                            .font(.caption)
                            .foregroundColor(.red)
                            .padding(.horizontal)
                    }
                    
                    Text("or enter manually")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    
                    // Coordinates Input
                    VStack(alignment: .leading, spacing: 15) {
                        Text("Enter Coordinates")
                            .font(.headline)
                        
                        HStack(spacing: 15) {
                            VStack(alignment: .leading, spacing: 5) {
                                Text("Latitude")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                                TextField("37.7749", text: $latitude)
                                    .keyboardType(.decimalPad)
                                    .padding()
                                    .background(Color(.systemGray6))
                                    .cornerRadius(10)
                            }
                            
                            VStack(alignment: .leading, spacing: 5) {
                                Text("Longitude")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                                TextField("-122.4194", text: $longitude)
                                    .keyboardType(.decimalPad)
                                    .padding()
                                    .background(Color(.systemGray6))
                                    .cornerRadius(10)
                            }
                        }
                        
                        Button(action: {
                            // Weather request action
                        }) {
                            HStack {
                                Image(systemName: "cloud.sun.fill")
                                Text("Get Weather")
                            }
                            .font(.headline)
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.blue)
                            .cornerRadius(12)
                        }
                        .disabled(latitude.isEmpty || longitude.isEmpty)
                    }
                    .padding(.horizontal)
                    
                    Spacer()
                }
            }
            .navigationBarTitleDisplayMode(.inline)
            .onChange(of: locationManager.location) { location in
                if let location = location {
                    latitude = String(format: "%.6f", location.coordinate.latitude)
                    longitude = String(format: "%.6f", location.coordinate.longitude)
                    isLoadingLocation = false
                }
            }
        }
    }
}

// MARK: - Location Manager
class LocationManager: NSObject, ObservableObject, CLLocationManagerDelegate {
    private let manager = CLLocationManager()
    
    @Published var location: CLLocation?
    @Published var errorMessage: String?
    
    override init() {
        super.init()
        manager.delegate = self
        manager.desiredAccuracy = kCLLocationAccuracyBest
    }
    
    func requestLocation() {
        errorMessage = nil
        
        // Check authorization status
        let status = manager.authorizationStatus
        
        switch status {
        case .notDetermined:
            manager.requestWhenInUseAuthorization()
        case .restricted, .denied:
            errorMessage = "Location access denied. Please enable in Settings."
        case .authorizedWhenInUse, .authorizedAlways:
            manager.requestLocation()
        @unknown default:
            errorMessage = "Unknown location authorization status"
        }
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        location = locations.first
        errorMessage = nil
    }
    
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        errorMessage = "Failed to get location: \(error.localizedDescription)"
    }
    
    func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        let status = manager.authorizationStatus
        
        if status == .authorizedWhenInUse || status == .authorizedAlways {
            manager.requestLocation()
        } else if status == .denied || status == .restricted {
            errorMessage = "Location access denied. Please enable in Settings."
        }
    }
}

// MARK: - Question View (Original Content)
struct QuestionView: View {
    @Binding var userMessage: String
    @Binding var compressedMessage: String
    @Binding var charactersSaved: Int
    @Binding var showingInstructions: Bool
    let twilioNumber: String
    let compressMessage: () -> Void
    let sendSMS: () -> Void
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(alignment: .leading, spacing: 28) {
                    HeaderSection()
                    QuickActionsSection(
                        userMessage: $userMessage,
                        compressMessage: compressMessage,
                        sendSMS: sendSMS
                    )
                    CustomMessageSection(
                        userMessage: $userMessage,
                        compressMessage: compressMessage
                    )
                    CompressedOutputSection(
                        compressedMessage: compressedMessage,
                        charactersSaved: charactersSaved,
                        userMessage: userMessage,
                        sendSMS: sendSMS
                    )
                    Spacer(minLength: 20)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
            }
            .background(Color(.systemGroupedBackground))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: {
                        showingInstructions = true
                    }) {
                        Image(systemName: "info.circle")
                            .foregroundColor(.primary)
                    }
                }
            }
            .sheet(isPresented: $showingInstructions) {
                InstructionsView(twilioNumber: twilioNumber)
            }
            .onTapGesture {
                hideKeyboard()
            }
        }
    }
    
    private func hideKeyboard() {
        UIApplication.shared.sendAction(#selector(UIResponder.resignFirstResponder), to: nil, from: nil, for: nil)
    }
}

// MARK: - Question View Sub-Components
struct HeaderSection: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text("BeaconAI")
                .font(.custom("Manrope-Bold", size: 32))
                .foregroundColor(.primary)
            
            Text("Emergency intelligence via satellite")
                .font(.system(size: 16))
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(.horizontal, 20)
        .padding(.top, 8)
    }
}

struct QuickActionsSection: View {
    @Binding var userMessage: String
    let compressMessage: () -> Void
    let sendSMS: () -> Void
    
    let commonPrompts = [
        CommonPrompt(icon: "bandage.fill", title: "Snake Bite", message: "snake bite 1st aid", color: .red),
        CommonPrompt(icon: "drop.fill", title: "Water Purify", message: "how 2 purify H2O", color: .blue),
        CommonPrompt(icon: "thermometer.snowflake", title: "Hypothermia", message: "hypothermia symptoms", color: .cyan),
        CommonPrompt(icon: "figure.fall", title: "Broken Bone", message: "broken bone treatment", color: .orange),
        CommonPrompt(icon: "leaf.fill", title: "Plant ID", message: "poison ivy identify", color: .green),
        CommonPrompt(icon: "flame.fill", title: "Start Fire", message: "start fire w/o matches", color: .red)
    ]
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Quick Actions")
                .font(.custom("Manrope-Bold", size: 20))
                .foregroundColor(.primary)
                .padding(.horizontal, 20)
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 10) {
                    ForEach(commonPrompts) { prompt in
                        CommonPromptCard(prompt: prompt) {
                            userMessage = prompt.message
                            compressMessage()
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                                sendSMS()
                            }
                        }
                    }
                }
                .padding(.horizontal, 20)
            }
        }
    }
}

struct CustomMessageSection: View {
    @Binding var userMessage: String
    let compressMessage: () -> Void
    @FocusState private var isTextEditorFocused: Bool
    
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Your Message")
                .font(.custom("Manrope-Bold", size: 20))
                .foregroundColor(.primary)
                .padding(.horizontal, 20)
            
            VStack(alignment: .leading, spacing: 8) {
                ZStack(alignment: .topLeading) {
                    if userMessage.isEmpty {
                        Text("What do you need help with?")
                            .foregroundColor(.secondary.opacity(0.6))
                            .padding(.horizontal, 8)
                            .padding(.vertical, 12)
                    }
                    
                    TextEditor(text: $userMessage)
                        .frame(height: 100)
                        .padding(4)
                        .scrollContentBackground(.hidden)
                        .background(Color(.systemBackground))
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(isTextEditorFocused ? Color.blue : Color(.systemGray4), lineWidth: 1.5)
                        )
                        .focused($isTextEditorFocused)
                }
                .background(Color(.systemBackground))
                .cornerRadius(12)
                
                if isTextEditorFocused {
                    Button(action: {
                        isTextEditorFocused = false
                    }) {
                        Text("Done")
                            .font(.system(size: 15, weight: .semibold))
                            .foregroundColor(.blue)
                    }
                }
            }
            .padding(.horizontal, 20)
            
            Button(action: {
                isTextEditorFocused = false
                compressMessage()
            }) {
                HStack(spacing: 8) {
                    Image(systemName: "arrow.down.circle.fill")
                        .font(.system(size: 18))
                    Text("Compress Message")
                        .font(.system(size: 17, weight: .semibold))
                }
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 16)
                .background(userMessage.isEmpty ? Color.gray.opacity(0.5) : Color.blue)
                .cornerRadius(12)
            }
            .padding(.horizontal, 20)
            .disabled(userMessage.isEmpty)
        }
    }
}

struct CompressedOutputSection: View {
    let compressedMessage: String
    let charactersSaved: Int
    let userMessage: String
    let sendSMS: () -> Void
    
    var body: some View {
        Group {
            if !compressedMessage.isEmpty {
                VStack(alignment: .leading, spacing: 16) {
                    Text("Compressed Message")
                        .font(.custom("Manrope-Bold", size: 20))
                        .foregroundColor(.primary)
                        .padding(.horizontal, 20)
                    
                    CompressedContent(
                        compressedMessage: compressedMessage,
                        charactersSaved: charactersSaved,
                        userMessage: userMessage,
                        sendSMS: sendSMS
                    )
                }
            }
        }
    }
}

struct CompressedHeader: View {
    let compressedMessage: String
    
    var body: some View {
        HStack {
            Text("\(compressedMessage.count) characters")
                .font(.system(size: 14))
                .foregroundColor(.secondary)
            Spacer()
            HStack(spacing: 4) {
                Image(systemName: "checkmark.circle.fill")
                    .font(.system(size: 12))
                Text("Ready")
                    .font(.system(size: 13, weight: .medium))
            }
            .foregroundColor(.green)
        }
    }
}

struct CompressedContent: View {
    let compressedMessage: String
    let charactersSaved: Int
    let userMessage: String
    let sendSMS: () -> Void
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            VStack(alignment: .leading, spacing: 8) {
                CompressedHeader(compressedMessage: compressedMessage)
                
                Text(compressedMessage)
                    .font(.system(size: 15, design: .monospaced))
                    .foregroundColor(.primary)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(12)
                    .background(Color(.systemGray6))
                    .cornerRadius(10)
                
                if charactersSaved > 0 {
                    HStack(spacing: 6) {
                        Image(systemName: "arrow.down.circle.fill")
                            .font(.system(size: 14))
                            .foregroundColor(.green)
                        Text("Saved \(charactersSaved) characters")
                            .font(.system(size: 14))
                            .foregroundColor(.secondary)
                    }
                }
            }
            
            HStack(spacing: 12) {
                Button(action: {
                    UIPasteboard.general.string = compressedMessage
                }) {
                    HStack(spacing: 6) {
                        Image(systemName: "doc.on.doc")
                            .font(.system(size: 16))
                        Text("Copy")
                            .font(.system(size: 16, weight: .medium))
                    }
                    .foregroundColor(.primary)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 14)
                    .background(Color(.systemGray5))
                    .cornerRadius(10)
                }
                
                Button(action: sendSMS) {
                    HStack(spacing: 6) {
                        Image(systemName: "paperplane.fill")
                            .font(.system(size: 16))
                        Text("Send")
                            .font(.system(size: 16, weight: .semibold))
                    }
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 14)
                    .background(Color.blue)
                    .cornerRadius(10)
                }
            }
        }
        .padding(.horizontal, 20)
    }
}

// MARK: - Common Prompt Models
struct CommonPrompt: Identifiable {
    let id = UUID()
    let icon: String
    let title: String
    let message: String
    let color: Color
}

struct CommonPromptCard: View {
    let prompt: CommonPrompt
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 8) {
                Image(systemName: prompt.icon)
                    .font(.system(size: 24))
                    .foregroundColor(.white)
                    .frame(width: 50, height: 50)
                    .background(
                        Circle()
                            .fill(
                                LinearGradient(
                                    gradient: Gradient(colors: [prompt.color, prompt.color.opacity(0.7)]),
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                    )
                
                Text(prompt.title)
                    .font(.caption)
                    .fontWeight(.semibold)
                    .foregroundColor(.primary)
                    .multilineTextAlignment(.center)
                    .lineLimit(2)
                    .frame(width: 80)
            }
            .padding(.vertical, 12)
            .padding(.horizontal, 8)
            .background(Color(.systemGray6))
            .cornerRadius(12)
        }
    }
}

// MARK: - Settings View
struct SettingsView: View {
    let twilioNumber: String
    
    var body: some View {
        NavigationView {
            List {
                Section(header: Text("About")) {
                    HStack {
                        Text("Version")
                        Spacer()
                        Text("1.0.0")
                            .foregroundColor(.secondary)
                    }
                    
                    HStack {
                        Text("Service Number")
                        Spacer()
                        Text(twilioNumber)
                            .foregroundColor(.secondary)
                            .font(.system(.body, design: .monospaced))
                    }
                }
                
                Section(header: Text("Support")) {
                    Button(action: {
                        // Open instructions
                    }) {
                        HStack {
                            Image(systemName: "book.fill")
                            Text("How to Use")
                            Spacer()
                            Image(systemName: "chevron.right")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                    }
                    
                    Button(action: {
                        // Open help
                    }) {
                        HStack {
                            Image(systemName: "questionmark.circle.fill")
                            Text("Help & FAQ")
                            Spacer()
                            Image(systemName: "chevron.right")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                    }
                }
                
                Section(header: Text("Legal")) {
                    Button(action: {
                        // Open privacy policy
                    }) {
                        HStack {
                            Image(systemName: "hand.raised.fill")
                            Text("Privacy Policy")
                            Spacer()
                            Image(systemName: "chevron.right")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                    }
                    
                    Button(action: {
                        // Open terms
                    }) {
                        HStack {
                            Image(systemName: "doc.text.fill")
                            Text("Terms of Service")
                            Spacer()
                            Image(systemName: "chevron.right")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                    }
                }
            }
            .navigationTitle("Settings")
        }
    }
}

// MARK: - Fire Alert View
struct FireAlertView: View {
    let twilioNumber: String
    @StateObject private var locationManager = LocationManager()
    @State private var isCheckingFire = false
    @State private var fireAlertMessage = ""
    @State private var showAlert = false
    @State private var region = MKCoordinateRegion(
        center: CLLocationCoordinate2D(latitude: 37.7749, longitude: -122.4194),
        span: MKCoordinateSpan(latitudeDelta: 0.5, longitudeDelta: 0.5)
    )
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(alignment: .leading, spacing: 28) {
                    // Header
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Fire Alert")
                            .font(.custom("Manrope-Bold", size: 32))
                            .foregroundColor(.primary)
                        
                        Text("Check for wildfires near your location")
                            .font(.system(size: 16))
                            .foregroundColor(.secondary)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal, 20)
                    .padding(.top, 8)
                    
                    // Map Section
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Your Location")
                            .font(.custom("Manrope-Bold", size: 20))
                            .foregroundColor(.primary)
                            .padding(.horizontal, 20)
                        
                        ZStack(alignment: .topTrailing) {
                            Map(coordinateRegion: $region, showsUserLocation: true, userTrackingMode: .constant(.follow))
                                .frame(height: 300)
                                .cornerRadius(16)
                                .overlay(
                                    RoundedRectangle(cornerRadius: 16)
                                        .stroke(Color(.systemGray4), lineWidth: 1)
                                )
                            
                            // Recenter button
                            Button(action: {
                                if let location = locationManager.location {
                                    withAnimation {
                                        region.center = location.coordinate
                                    }
                                }
                            }) {
                                Image(systemName: "location.fill")
                                    .font(.system(size: 16))
                                    .foregroundColor(.blue)
                                    .padding(10)
                                    .background(Color(.systemBackground))
                                    .clipShape(Circle())
                                    .shadow(color: .black.opacity(0.1), radius: 4, x: 0, y: 2)
                            }
                            .padding(12)
                        }
                        .padding(.horizontal, 20)
                        
                        if let location = locationManager.location {
                            HStack(spacing: 6) {
                                Image(systemName: "mappin.circle.fill")
                                    .font(.system(size: 14))
                                    .foregroundColor(.blue)
                                Text(String(format: "%.4f, %.4f", location.coordinate.latitude, location.coordinate.longitude))
                                    .font(.system(size: 14, design: .monospaced))
                                    .foregroundColor(.secondary)
                            }
                            .padding(.horizontal, 20)
                        }
                    }
                    
                    // Check Fire Alert Section
                    VStack(alignment: .leading, spacing: 16) {
                        Text("Fire Check")
                            .font(.custom("Manrope-Bold", size: 20))
                            .foregroundColor(.primary)
                            .padding(.horizontal, 20)
                        
                        VStack(spacing: 12) {
                            Button(action: {
                                checkFireAlert()
                            }) {
                                HStack(spacing: 8) {
                                    if isCheckingFire {
                                        ProgressView()
                                            .progressViewStyle(CircularProgressViewStyle(tint: .white))
                                            .scaleEffect(0.9)
                                    } else {
                                        Image(systemName: "flame.fill")
                                            .font(.system(size: 18))
                                    }
                                    Text(isCheckingFire ? "Checking..." : "Check for Wildfires")
                                        .font(.system(size: 17, weight: .semibold))
                                }
                                .foregroundColor(.white)
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 16)
                                .background(
                                    LinearGradient(
                                        gradient: Gradient(colors: [Color.orange, Color.red]),
                                        startPoint: .leading,
                                        endPoint: .trailing
                                    )
                                )
                                .cornerRadius(12)
                            }
                            .disabled(isCheckingFire || locationManager.location == nil)
                            .opacity((isCheckingFire || locationManager.location == nil) ? 0.6 : 1.0)
                            
                            if locationManager.location == nil {
                                HStack(spacing: 8) {
                                    Image(systemName: "info.circle")
                                        .font(.system(size: 14))
                                    Text("Enable location services to check for fires")
                                        .font(.system(size: 14))
                                }
                                .foregroundColor(.secondary)
                            }
                            
                            if !fireAlertMessage.isEmpty {
                                VStack(alignment: .leading, spacing: 8) {
                                    HStack {
                                        Image(systemName: showAlert ? "exclamationmark.triangle.fill" : "checkmark.circle.fill")
                                            .font(.system(size: 16))
                                            .foregroundColor(showAlert ? .orange : .green)
                                        Text(showAlert ? "Fire Alert" : "All Clear")
                                            .font(.system(size: 16, weight: .semibold))
                                            .foregroundColor(showAlert ? .orange : .green)
                                    }
                                    
                                    Text(fireAlertMessage)
                                        .font(.system(size: 15))
                                        .foregroundColor(.primary)
                                        .fixedSize(horizontal: false, vertical: true)
                                }
                                .padding(16)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .background(showAlert ? Color.orange.opacity(0.1) : Color.green.opacity(0.1))
                                .cornerRadius(12)
                                .overlay(
                                    RoundedRectangle(cornerRadius: 12)
                                        .stroke(showAlert ? Color.orange.opacity(0.3) : Color.green.opacity(0.3), lineWidth: 1)
                                )
                            }
                        }
                        .padding(.horizontal, 20)
                    }
                    
                    // Info Section
                    VStack(alignment: .leading, spacing: 12) {
                        Text("How It Works")
                            .font(.custom("Manrope-Bold", size: 20))
                            .foregroundColor(.primary)
                            .padding(.horizontal, 20)
                        
                        VStack(alignment: .leading, spacing: 12) {
                            InfoRow(
                                icon: "1.circle.fill",
                                text: "We check NASA's FIRMS database for active fires",
                                color: .blue
                            )
                            InfoRow(
                                icon: "2.circle.fill",
                                text: "Analyzes fires within 50km of your location",
                                color: .blue
                            )
                            InfoRow(
                                icon: "3.circle.fill",
                                text: "Provides real-time wildfire risk assessment",
                                color: .blue
                            )
                        }
                        .padding(.horizontal, 20)
                    }
                    
                    Spacer(minLength: 20)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
            }
            .background(Color(.systemGroupedBackground))
            .navigationBarTitleDisplayMode(.inline)
        }
        .onAppear {
            locationManager.requestLocation()
            if let location = locationManager.location {
                region.center = location.coordinate
            }
        }
        .onChange(of: locationManager.location) { location in
            if let location = location {
                withAnimation {
                    region.center = location.coordinate
                }
            }
        }
    }
    
    private func checkFireAlert() {
        guard let location = locationManager.location else { return }
        
        isCheckingFire = true
        fireAlertMessage = ""
        
        let message = "wildfire \(location.coordinate.latitude), \(location.coordinate.longitude)"
        let sms = "sms:\(twilioNumber)&body=\(message.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? "")"
        
        if let url = URL(string: sms) {
            UIApplication.shared.open(url)
        }
        
        // Simulate response (in real app, you'd wait for SMS response)
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            isCheckingFire = false
            // This is a placeholder - in reality, you'd parse the SMS response
            showAlert = false
            fireAlertMessage = "Fire check sent! You'll receive an SMS response with the fire alert status for your location."
        }
    }
}

struct InfoRow: View {
    let icon: String
    let text: String
    let color: Color
    
    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: icon)
                .font(.system(size: 18))
                .foregroundColor(color)
                .frame(width: 24)
            
            Text(text)
                .font(.system(size: 15))
                .foregroundColor(.secondary)
                .fixedSize(horizontal: false, vertical: true)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
