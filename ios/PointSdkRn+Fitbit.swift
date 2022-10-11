import Foundation
import PointSDK

@objc
extension PointSdkRn {
    func setupFitbitIntegration(_ fitbitClientId: String, callback: RCTResponseSenderBlock) {
        fitbitManager = Point.setupFitbitIntegration(fitbitClientId: fitbitClientId)
        callback([NSNull(), true])
    }
        
    func authenticateFitbit(_ callbackURLScheme: String, fitbitScopes: Array<String>?, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        Task {
            guard !Task.isCancelled else { return }
                
            do {
                var scopes = FitbitScopes.allCases
                if let scopesParam = fitbitScopes {
                    scopes = scopesParam.compactMap { fitbitScopesMapping(type: $0) }
                }
                    
                try await fitbitManager?.authenticate(scopes: scopes, callbackURLScheme: callbackURLScheme)
                resolve(true)
            } catch {
                reject("authenticateFitbit", error.localizedDescription, error)
            }
        }
    }
        
    func revokeFitbitAuthentication(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        Task {
            guard !Task.isCancelled else { return }
                
            do {
                try await fitbitManager?.revoke()
                resolve(true)
            } catch {
                reject("revokeFitbitAuthentication", error.localizedDescription, error)
            }
        }
    }
        
    func isFitbitAuthenticated(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        Task {
            guard !Task.isCancelled else { return }
                
            do {
                let result = try await fitbitManager?.getUserAuthenticationStatus()?.active ?? false
                resolve(result)
            } catch {
                reject("isFitbitAuthenticated", error.localizedDescription, error)
            }
        }
    }
}
