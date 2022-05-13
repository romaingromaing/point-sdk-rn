#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PointSdkRn, NSObject)
RCT_EXTERN_METHOD(setup:(NSString)clientId clientSecret: (NSString)clientSecret permissions: (NSArray)pemissions environment: (NSString)environment verbose: (BOOL)verbose callback: (RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(requestPermissions:(RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(setUserToken:(NSString)accessToken resolve: (RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(logout:(RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(setupBackgroundListeners:(RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject);

RCT_EXTERN_METHOD(enableBackgroundListeners:(RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(disableBackgroundListeners:(RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(enableForegroundListeners:(RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(disableForegroundListeners:(RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject);

RCT_EXTERN_METHOD(getUserData:(RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(getUserTrends:(RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(getUserWorkouts:(NSInteger)offset resolve: (RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(getUserWorkoutById:(NSInteger)id resolve: (RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(getDailyHistory:(NSInteger)offset resolve: (RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(getWorkoutRecommendations:(NSString)date resolve: (RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(saveWorkoutRecommendation:(NSInteger)id resolve: (RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(setUserGoal:(NSString)goal resolve: (RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(setUserSpecificGoal:(NSString)specificGoal resolve: (RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(getUserHealthMetrics:(NSArray *)filter resolve: (RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(getUserRecommendations:(RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(recommendationSeen:(NSInteger)id resolve: (RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject);

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}
@end
