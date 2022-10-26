import Foundation
import PointSDK

@objc
extension PointSdkRn {
    func setupOuraIntegration(_ ouraClientId: String, callback: RCTResponseSenderBlock) {
        ouraManager = Point.setupOuraIntegration(ouraClientId: ouraClientId)
        callback([NSNull(), true])
    }
        
    func authenticateOura(_ callbackURLScheme: String, ouraScopes: Array<String>?, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        Task {
            guard !Task.isCancelled else { return }
                
            do {
                var scopes = OuraScopes.allCases
                if let scopesParam = ouraScopes {
                    scopes = scopesParam.compactMap { ouraScopesMapping(type: $0) }
                }
                    
                try await ouraManager?.authenticate(scopes: scopes, callbackURLScheme: callbackURLScheme)
                resolve(true)
            } catch {
                reject("authenticateOura", error.localizedDescription, error)
            }
        }
    }
        
    func revokeOuraAuthentication(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        Task {
            guard !Task.isCancelled else { return }
                
            do {
                try await ouraManager?.revoke()
                resolve(true)
            } catch {
                reject("revokeOuraAuthentication", error.localizedDescription, error)
            }
        }
    }
        
    func isOuraAuthenticated(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        Task {
            guard !Task.isCancelled else { return }
                
            do {
                let result = try await ouraManager?.getUserAuthenticationStatus()?.active ?? false
                resolve(result)
            } catch {
                reject("isOuraAuthenticated", error.localizedDescription, error)
            }
        }
    }
}
