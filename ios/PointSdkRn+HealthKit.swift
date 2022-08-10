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
     *  startAllListeners Start background listeners
     *  @param resolve            Resolve handler
     *  @param reject             Reject handler
     */

    func startAllListeners(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        Task {
            do {
                let _ = try await healthKit?.startAllListeners()
                resolve(true)
            } catch {
                reject("startBackgroundListeners", error.localizedDescription, error)
            }
        }
    }
  
    /**
     *  stopAllListeners  Stop background listener
     *  @param resolve              Resolve handler
     *  @param reject               Reject handler
     */

    func stopAllListeners(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        Task {
            do {
                try await healthKit?.stopAllListeners()
                resolve(true)
            } catch {
                reject("stopBackgroundListeners", error.localizedDescription, error)
            }
        }
    }
}
