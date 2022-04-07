#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PointSdkRn, NSObject)
RCT_EXTERN_METHOD(setup:(NSString)clientId clientSecret: (NSString)clientSecret permissions: (NSArray)pemissions callback: (RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(requestPermissions:(RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(login:(NSString)accessToken resolve: (RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getUserData:(RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(logout:(RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setupBackgroundListener:(RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(startBackgroundListener:(RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(stopBackgroundListener:(RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getUserWorkouts:(double)offset resolve: (RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}
@end
