import Foundation
import PointSDK

@objc(PointSdkRn)
class PointSdkRn: NSObject {
  private let healthKitManager = PointSDK.healthKit
  private let dataManager = PointSDK.dataManager

  @objc func setup(_ apiKey: String, callback: RCTResponseSenderBlock) -> Void {
    NSLog("The ApiKey is: %@", apiKey)
    PointSDK.setup(apiKey: apiKey)
    callback([NSNull(), apiKey])
  }
}
