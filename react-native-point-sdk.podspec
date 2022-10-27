# react-native-point-sdk.podspec

require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name          = "react-native-point-sdk"
  s.version       = package["version"]
  s.summary       = package["description"]
  s.description   = <<-DESC
  Point SDK provides an easy, “plug-and-play” way for you to get access to the full-range of user health metrics powered by Point.

  With Point SDK, you can:

      Collect user health and fitness data from across multiple wearable devices and have it processed by Point.
      Decide the granularity of health and fitness data you would like to use from the wearable devices, depending on your app needs.
      Retrieve digested health metrics in a normalized, consistent data format across all devices

  Point SDK provides a high-level interface for you to setup some listeners on your app, which will be watching for new wearables data coming from Apple HealthKit and proceed to process this data asynchronously.

  Point is continually deriving new health metrics, health score updates, personalized health insights, and workout recommendations based on the wearables data, and you can retrieve those through our SDK at any time to deliver a custom experience to your users.
  DESC
  s.homepage      = "https://github.com/agencyenterprise/point-sdk-rn"
  s.license     = { :type => "Proprietary", :text => "Copyright (c) [2022] [Key Point Technologies, Inc.]"}
  s.authors       = { "Key Point Technologies, Inc." => "tech@areyouonpoint.co" }
  s.platforms     = { :ios => "13.0" }
  s.source        = { :git => "https://github.com/github_account/react-native-point-sdk.git", :tag => "#{s.version}" }
  s.swift_version = "5.5"

  s.source_files  = "ios/**/*.{h,c,cc,cpp,m,mm,swift}"
  s.requires_arc  = true

  s.dependency "React"
  s.dependency "PointSDK", '~> 1.2.1'
end

