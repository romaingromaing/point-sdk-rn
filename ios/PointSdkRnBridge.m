#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>


@interface RCT_EXTERN_MODULE(PointSdkRn, NSObject)
    RCT_EXTERN_METHOD(setup:(NSString *)apiKey callback: (RCTResponseSenderBlock)callback);
    RCT_EXTERN_METHOD(requestPermissions: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
@end