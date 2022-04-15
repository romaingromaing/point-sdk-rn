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
   *  @param resolve           Resolve handler
   *  @param reject            Reject handler
   */
  @objc
  func startBackgroundListeners(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        let _ = try await healthKit?.enableAllBackgroundDelivery()
        resolve(true)
      } catch {
        reject("startBackgroundListeners", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  stopBackgroundListeners Stop background listener
   *  @param resolve          Resolve handler
   *  @param reject           Reject handler
   */
  @objc
  func stopBackgroundListeners(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        try await healthKit?.disableAllBackgroundDelivery()
        resolve(true)
      } catch {
        reject("stopBackgroundListeners", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  setupBackgroundListeners Setup background listeners
   *  @param resolve           Resolve handler
   *  @param reject            Reject handler
   */
  @objc
  func setupBackgroundListeners(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        await healthKit?.setupAllBackgroundQueries()
        resolve(true)
      } catch {
        reject("setupBackgroundListeners", error.localizedDescription, error)
      }
    }
  }
}
