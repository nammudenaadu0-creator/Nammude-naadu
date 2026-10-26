import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

func processIcon() {
    let sourceURL = URL(fileURLWithPath: "assets/app-icon.png")
    guard let imageSource = CGImageSourceCreateWithURL(sourceURL as CFURL, nil),
          let originalImage = CGImageSourceCreateImageAtIndex(imageSource, 0, nil) else {
        print("Failed to load source image")
        return
    }
    
    // Adaptive icon foreground sizes (108dp base)
    // 0.65 ensures 100% inside the 66dp Android safe zone
    let foregroundConfigs: [(String, Int, Double)] = [
        ("mipmap-mdpi", 108, 0.65),
        ("mipmap-hdpi", 162, 0.65),
        ("mipmap-xhdpi", 216, 0.65),
        ("mipmap-xxhdpi", 324, 0.65),
        ("mipmap-xxxhdpi", 432, 0.65)
    ]
    
    // Legacy launcher icon sizes (48dp base)
    let legacyConfigs: [(String, Int, Double)] = [
        ("mipmap-mdpi", 48, 0.78),
        ("mipmap-hdpi", 72, 0.78),
        ("mipmap-xhdpi", 96, 0.78),
        ("mipmap-xxhdpi", 144, 0.78),
        ("mipmap-xxxhdpi", 192, 0.78)
    ]
    
    // 1. Generate Foreground PNGs
    for (folder, size, scaleRatio) in foregroundConfigs {
        let colorSpace = CGColorSpaceCreateDeviceRGB()
        let bitmapInfo = CGImageAlphaInfo.premultipliedLast.rawValue
        guard let ctx = CGContext(data: nil, width: size, height: size, bitsPerComponent: 8, bytesPerRow: size * 4, space: colorSpace, bitmapInfo: bitmapInfo) else {
            continue
        }
        
        ctx.interpolationQuality = .high
        ctx.clear(CGRect(x: 0, y: 0, width: size, height: size))
        
        let contentSize = Double(size) * scaleRatio
        let originX = (Double(size) - contentSize) / 2.0
        let originY = (Double(size) - contentSize) / 2.0
        let drawRect = CGRect(x: originX, y: originY, width: contentSize, height: contentSize)
        
        ctx.draw(originalImage, in: drawRect)
        
        guard let resultImage = ctx.makeImage() else { continue }
        
        let destPath = "android/app/src/main/res/\(folder)/ic_launcher_foreground.png"
        let destURL = URL(fileURLWithPath: destPath)
        guard let destination = CGImageDestinationCreateWithURL(destURL as CFURL, UTType.png.identifier as CFString, 1, nil) else { continue }
        CGImageDestinationAddImage(destination, resultImage, nil)
        CGImageDestinationFinalize(destination)
    }
    
    // 2. Generate Legacy Launcher Icons
    for (folder, size, scaleRatio) in legacyConfigs {
        let colorSpace = CGColorSpaceCreateDeviceRGB()
        let bitmapInfo = CGImageAlphaInfo.premultipliedLast.rawValue
        guard let ctx = CGContext(data: nil, width: size, height: size, bitsPerComponent: 8, bytesPerRow: size * 4, space: colorSpace, bitmapInfo: bitmapInfo) else {
            continue
        }
        
        ctx.interpolationQuality = .high
        ctx.setFillColor(CGColor(red: 1.0, green: 1.0, blue: 1.0, alpha: 1.0))
        ctx.fill(CGRect(x: 0, y: 0, width: size, height: size))
        
        let contentSize = Double(size) * scaleRatio
        let originX = (Double(size) - contentSize) / 2.0
        let originY = (Double(size) - contentSize) / 2.0
        let drawRect = CGRect(x: originX, y: originY, width: contentSize, height: contentSize)
        
        ctx.draw(originalImage, in: drawRect)
        
        guard let resultImage = ctx.makeImage() else { continue }
        let destPath = "android/app/src/main/res/\(folder)/ic_launcher.png"
        let destURL = URL(fileURLWithPath: destPath)
        guard let destination = CGImageDestinationCreateWithURL(destURL as CFURL, UTType.png.identifier as CFString, 1, nil) else { continue }
        CGImageDestinationAddImage(destination, resultImage, nil)
        CGImageDestinationFinalize(destination)
        
        // Round launcher
        guard let roundCtx = CGContext(data: nil, width: size, height: size, bitsPerComponent: 8, bytesPerRow: size * 4, space: colorSpace, bitmapInfo: bitmapInfo) else {
            continue
        }
        roundCtx.interpolationQuality = .high
        roundCtx.addEllipse(in: CGRect(x: 0, y: 0, width: size, height: size))
        roundCtx.clip()
        
        roundCtx.setFillColor(CGColor(red: 1.0, green: 1.0, blue: 1.0, alpha: 1.0))
        roundCtx.fill(CGRect(x: 0, y: 0, width: size, height: size))
        roundCtx.draw(originalImage, in: drawRect)
        
        guard let roundResultImage = roundCtx.makeImage() else { continue }
        let roundDestPath = "android/app/src/main/res/\(folder)/ic_launcher_round.png"
        let roundDestURL = URL(fileURLWithPath: roundDestPath)
        guard let roundDestination = CGImageDestinationCreateWithURL(roundDestURL as CFURL, UTType.png.identifier as CFString, 1, nil) else { continue }
        CGImageDestinationAddImage(roundDestination, roundResultImage, nil)
        CGImageDestinationFinalize(roundDestination)
    }
    print("Done regenerating all Android icons!")
}

processIcon()
