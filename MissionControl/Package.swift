// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "BUS331MissionControl",
    platforms: [.macOS(.v14)],
    products: [
        .executable(name: "BUS331MissionControl", targets: ["BUS331MissionControl"]),
    ],
    targets: [
        .executableTarget(
            name: "BUS331MissionControl",
            path: "Sources/BUS331MissionControl"
        ),
    ],
    swiftLanguageModes: [.v5]
)
