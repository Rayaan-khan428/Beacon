//
//  OnboardingView.swift
//  BeaconAI
//
//  Created by Rayaan Khan on 2025-10-04.
//

import SwiftUI

struct OnboardingView: View {
    @Binding var hasCompletedOnboarding: Bool
    @State private var currentPage = 0
    
    var body: some View {
        TabView(selection: $currentPage) {
            // Slide 1: The Problem
            OnboardingSlide1()
                .tag(0)
            
            // Slide 2: How It Works
            OnboardingSlide3()
                .tag(1)
            
            // Slide 3: Use Cases
            OnboardingSlide5()
                .tag(2)
            
            // Slide 4: Get Started
            OnboardingSlide7(hasCompletedOnboarding: $hasCompletedOnboarding)
                .tag(3)
        }
        .tabViewStyle(PageTabViewStyle())
        .indexViewStyle(PageIndexViewStyle(backgroundDisplayMode: .always))
        .ignoresSafeArea()
        .animation(.easeInOut(duration: 0.3), value: currentPage)
    }
}

// MARK: - Slide 1: The Problem
struct OnboardingSlide1: View {
    @State private var isVisible = false
    
    var body: some View {
        ZStack {
            Image("slide-1")
                .resizable()
                .scaledToFill()
                .frame(width: UIScreen.main.bounds.width, height: UIScreen.main.bounds.height)
                .clipped()
                .ignoresSafeArea()
            
            // Gradient overlay
            LinearGradient(
                gradient: Gradient(colors: [
                    Color.black.opacity(0),
                    Color.black.opacity(0.3),
                    Color.black.opacity(0.7)
                ]),
                startPoint: .top,
                endPoint: .bottom
            )
            .ignoresSafeArea()

            VStack(alignment: .leading, spacing: 0) {
                Spacer()
                
                // Content
                VStack(alignment: .leading, spacing: 16) {
                    Text("When Cellular Fails,\nYou're Not Alone")
                        .font(.custom("Manrope-Bold", size: 30))
                        .foregroundColor(.white)
                        .multilineTextAlignment(.leading)
                        .fixedSize(horizontal: false, vertical: true)
                    
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Backcountry emergencies happen when you're off-grid")
                            .foregroundColor(.white)
                            .fixedSize(horizontal: false, vertical: true)
                        Text("Weather changes can be life-threatening")
                            .foregroundColor(.white)
                            .fixedSize(horizontal: false, vertical: true)
                        Text("Medical emergencies need immediate guidance")
                            .foregroundColor(.white)
                            .fixedSize(horizontal: false, vertical: true)
                        Text("Traditional satellite messaging is limited to pre-set messages")
                            .foregroundColor(.white)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                    .font(.system(size: 15))
                }
                .padding(.horizontal, 20)
                .padding(.bottom, 80)
                .opacity(isVisible ? 1 : 0)
                .offset(y: isVisible ? 0 : 20)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .onAppear {
            withAnimation(.easeOut(duration: 0.8)) {
                isVisible = true
            }
        }
    }
}

// MARK: - Slide 3: How It Works
struct OnboardingSlide3: View {
    @State private var isVisible = false
    
    var body: some View {
        ZStack {
            Image("slide-3")
                .resizable()
                .scaledToFill()
                .frame(width: UIScreen.main.bounds.width, height: UIScreen.main.bounds.height)
                .clipped()
                .ignoresSafeArea()
            
            // Gradient overlay
            LinearGradient(
                gradient: Gradient(colors: [
                    Color.black.opacity(0),
                    Color.black.opacity(0.3),
                    Color.black.opacity(0.7)
                ]),
                startPoint: .top,
                endPoint: .bottom
            )
            .ignoresSafeArea()
            
            VStack(alignment: .leading, spacing: 0) {
                Spacer()
                
                VStack(alignment: .leading, spacing: 16) {
                    Text("3 Steps to Emergency Answers")
                        .font(.custom("Manrope-Bold", size: 30))
                        .foregroundColor(.white)
                        .multilineTextAlignment(.leading)
                        .fixedSize(horizontal: false, vertical: true)
                    
                    // Steps
                    VStack(spacing: 20) {
                        StepRow(icon: "keyboard", title: "Type", description: "Your question or coordinates")
                        StepRow(icon: "arrow.down.circle.fill", title: "Compress", description: "App optimizes for satellite limits")
                        StepRow(icon: "message.fill", title: "Send", description: "Text to our satellite-connected number")
                        StepRow(icon: "checkmark.circle.fill", title: "Receive", description: "Get compressed AI response in seconds")
                    }
                }
                .padding(.horizontal, 20)
                .padding(.bottom, 80)
                .opacity(isVisible ? 1 : 0)
                .offset(y: isVisible ? 0 : 20)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .onAppear {
            withAnimation(.easeOut(duration: 0.8)) {
                isVisible = true
            }
        }
    }
}


// MARK: - Slide 5: Use Cases
struct OnboardingSlide5: View {
    @State private var isVisible = false
    
    var body: some View {
        ZStack {
            Image("slide-4")
                .resizable()
                .scaledToFill()
                .frame(width: UIScreen.main.bounds.width, height: UIScreen.main.bounds.height)
                .clipped()
                .ignoresSafeArea()
            
            // Gradient overlay
            LinearGradient(
                gradient: Gradient(colors: [
                    Color.black.opacity(0),
                    Color.black.opacity(0.3),
                    Color.black.opacity(0.7)
                ]),
                startPoint: .top,
                endPoint: .bottom
            )
            .ignoresSafeArea()
            
            VStack(alignment: .leading, spacing: 0) {
                Spacer()
                
                VStack(alignment: .leading, spacing: 16) {
                    Text("Built for Real Emergencies")
                        .font(.custom("Manrope-Bold", size: 30))
                        .foregroundColor(.white)
                        .multilineTextAlignment(.leading)
                        .fixedSize(horizontal: false, vertical: true)
                    
                    // Use Cases
                    VStack(spacing: 16) {
                        UseCaseRow(
                            icon: "mountain.2.fill",
                            title: "Backcountry",
                            description: "Weather alerts, wildlife encounters, navigation help"
                        )
                        
                        UseCaseRow(
                            icon: "water.waves",
                            title: "Maritime",
                            description: "Storm warnings, medical emergencies, coordinates"
                        )
                        
                        UseCaseRow(
                            icon: "exclamationmark.triangle.fill",
                            title: "Disaster Response",
                            description: "When infrastructure fails, stay connected"
                        )
                        
                        UseCaseRow(
                            icon: "figure.hiking",
                            title: "Remote Work",
                            description: "Scientific expeditions, humanitarian missions"
                        )
                    }
                }
                .padding(.horizontal, 20)
                .padding(.bottom, 80)
                .opacity(isVisible ? 1 : 0)
                .offset(y: isVisible ? 0 : 20)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .onAppear {
            withAnimation(.easeOut(duration: 0.8)) {
                isVisible = true
            }
        }
    }
}


// MARK: - Slide 5: Get Started
struct OnboardingSlide7: View {
    @Binding var hasCompletedOnboarding: Bool
    @State private var isVisible = false
    
    var body: some View {
        ZStack {
            Image("slide-5")
                .resizable()
                .scaledToFill()
                .frame(width: UIScreen.main.bounds.width, height: UIScreen.main.bounds.height)
                .clipped()
                .ignoresSafeArea()
            
            // Gradient overlay
            LinearGradient(
                gradient: Gradient(colors: [
                    Color.black.opacity(0),
                    Color.black.opacity(0.3),
                    Color.black.opacity(0.7)
                ]),
                startPoint: .top,
                endPoint: .bottom
            )
            .ignoresSafeArea()
            
            VStack(alignment: .leading, spacing: 0) {
                Spacer()
                
                // Content
                VStack(alignment: .leading, spacing: 16) {
                    Text("Ready to Stay\nConnected?")
                        .font(.custom("Manrope-Bold", size: 34))
                        .foregroundColor(.white)
                        .multilineTextAlignment(.leading)
                        .fixedSize(horizontal: false, vertical: true)
                    
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Try it now with any question")
                            .foregroundColor(.white)
                            .fixedSize(horizontal: false, vertical: true)
                        Text("Weather updates: Include coordinates")
                            .foregroundColor(.white)
                            .fixedSize(horizontal: false, vertical: true)
                        Text("AI assistance: Ask anything")
                            .foregroundColor(.white)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                    .font(.system(size: 15))
                    
                    // Get Started Button
                    Button(action: {
                        withAnimation {
                            hasCompletedOnboarding = false
                        }
                    }) {
                        HStack(spacing: 10) {
                            Text("Start Using Beacon")
                                .font(.custom("Manrope-Bold", size: 17))
                            Image(systemName: "arrow.right.circle.fill")
                                .font(.title3)
                        }
                        .foregroundColor(.blue)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.white)
                        .cornerRadius(16)
                        .shadow(color: .black.opacity(0.3), radius: 10, x: 0, y: 5)
                    }
                    .padding(.top, 8)
                }
                .padding(.horizontal, 20)
                .padding(.bottom, 80)
                .opacity(isVisible ? 1 : 0)
                .offset(y: isVisible ? 0 : 20)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .onAppear {
            withAnimation(.easeOut(duration: 0.8)) {
                isVisible = true
            }
        }
    }
}

// MARK: - Helper Components
struct BulletPoint: View {
    let text: String
    
    var body: some View {
        HStack(alignment: .top, spacing: 10) {
            Image(systemName: "checkmark.circle.fill")
                .foregroundColor(.white)
                .font(.body)
            Text(text)
                .foregroundColor(.white)
                .font(.body)
        }
    }
}

struct StepRow: View {
    let icon: String
    let title: String
    let description: String
    
    var body: some View {
        HStack(spacing: 15) {
            // Icon
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(.white)
                .frame(width: 30)
            
            // Text
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.headline)
                    .foregroundColor(.white)
                Text(description)
                    .font(.subheadline)
                    .foregroundColor(.white.opacity(0.9))
            }
            
            Spacer()
        }
    }
}

struct UseCaseRow: View {
    let icon: String
    let title: String
    let description: String
    
    var body: some View {
        HStack(alignment: .top, spacing: 15) {
            Image(systemName: icon)
                .font(.title)
                .foregroundColor(.white)
                .frame(width: 40)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.headline)
                    .foregroundColor(.white)
                Text(description)
                    .font(.subheadline)
                    .foregroundColor(.white.opacity(0.9))
            }
            
            Spacer()
        }
    }
}

struct OnboardingView_Previews: PreviewProvider {
    static var previews: some View {
        OnboardingView(hasCompletedOnboarding: .constant(false))
    }
}
