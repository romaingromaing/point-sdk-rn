import Foundation
import PointSDK

@objc extension PointSdkRn {
  /**
   *  requestPermissions  Request HealthKit permissions
   *  @param permissions  Permisisons to request
   *  @param resolve      Resolve handler
   *  @param reject       Reject handler
   */
  @objc
  func requestPermissions(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        try await healthKit?.requestAuthorizationsIfPossible()
        resolve(true)
      } catch {
        reject("requestPermissions", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  startBackgroundListeners Start background listeners
   *  @param resolve            Resolve handler
   *  @param reject             Reject handler
   */
  @objc
  func startBackgroundListeners(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        let _ = try await healthKit?.startAllBackgroundListeners()
        resolve(true)
      } catch {
        reject("startBackgroundListeners", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  disableBackgroundListeners  Stop background listener
   *  @param resolve              Resolve handler
   *  @param reject               Reject handler
   */
  @objc
  func disableBackgroundListeners(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        try await healthKit?.disableAllBackgroundListeners()
        resolve(true)
      } catch {
        reject("stopBackgroundListeners", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  enableForegroundListeners Enable foreground listeners
   *  @param resolve            Resolve handler
   *  @param reject             Reject handler
   */
  @objc
  func enableForegroundListeners(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        let _ = try await healthKit?.enableAllForegroundListeners()
        resolve(true)
      } catch {
        reject("enableForegroundListeners", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  disableForegroundListeners  Disable foreground listeners
   *  @param resolve              Resolve handler
   *  @param reject               Reject handler
   */
  @objc
  func disableForegroundListeners(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        healthKit?.stopAllForegroundListeners()
        resolve(true)
      } catch {
        reject("disableForegroundListeners", error.localizedDescription, error)
      }
    }
  }
}
