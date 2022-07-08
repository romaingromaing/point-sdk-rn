import Foundation
import PointSDK

@objc
extension PointSdkRn {
    
    func setupHealthkitIntegration(_ queryTypes: Array<String>?, callback: RCTResponseSenderBlock) {
        var queriesTypes: [HealthQueryType] = []
      
        if let types = queryTypes {
            queriesTypes = types.compactMap { HealthQueryType(rawValue: $0) }
        }
        
        healthKit = Point.setupHealthkitIntegration(queryTypes: Set(queriesTypes))
        
        callback([NSNull(), true])
    }
    
    /**
     *  requestPermissions  Request HealthKit permissions
     *  @param permissions  Permisisons to request
     *  @param resolve      Resolve handler
     *  @param reject       Reject handler
     */

    func requestPermissions(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
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

    func startBackgroundListeners(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
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

    func disableBackgroundListeners(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
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

    func enableForegroundListeners(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
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

    func disableForegroundListeners(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
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
