# react-native-point-sdk.podspec

require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-point-sdk"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  react-native-point-sdk
                   DESC
  s.homepage     = "https://github.com/github_account/react-native-point-sdk"
  # brief license entry:
  s.license      = "MIT"
  # optional - use expanded license entry instead:
  # s.license    = { :type => "MIT", :file => "LICENSE" }
  s.authors      = { "Anny Figueira" => "anny.figueira@gmail.com" }
  s.platforms    = { :ios => "15.0" }
  s.source       = { :git => "https://github.com/agencyenterprise/point-sdk-rn.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,c,cc,cpp,m,mm,swift}"
  s.requires_arc = true

  s.dependency "React"
  s.dependency "PointSDK", '~> 0.0.4'
end

