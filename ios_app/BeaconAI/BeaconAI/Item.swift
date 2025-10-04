//
//  Item.swift
//  BeaconAI
//
//  Created by Rayaan Khan on 2025-10-04.
//

import Foundation
import SwiftData

@Model
final class Item {
    var timestamp: Date
    
    init(timestamp: Date) {
        self.timestamp = timestamp
    }
}
