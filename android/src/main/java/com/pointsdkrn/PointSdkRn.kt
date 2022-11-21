package com.pointsdkrn

import co.areyouonpoint.pointsdk.PointClient
import co.areyouonpoint.pointsdk.domain.PointEnvironment
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray

class PointSdkRn(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    private val reactContext: ReactApplicationContext

    init {
        this.reactContext = reactContext
    }

    override fun getName() = "PointSdkRn"

    @ReactMethod
    fun setup(clientId: String, clientSecret: String, environment: String, verbose: Boolean, callback: Callback) {
        PointClient.getInstance(
            context = reactContext,
            clientId = clientId,
            clientSecret = clientSecret,
            apiEnvironment = PointEnvironment.DEVELOPMENT
        )
        callback.invoke()
    }

    @ReactMethod
    fun setupHealthkitIntegration(queryTypes: ReadableArray, callback: Callback) {
        print("Android doesn't support healthkit")
        callback.invoke()
    }

    @ReactMethod
    fun startAllListeners() {
        print("Android doesn't support healthkit")
    }

    @ReactMethod
    fun setupFitbitIntegration(fitbitClientID: String, callback: Callback) {
        print("Not implemented")
        callback.invoke()
    }

    @ReactMethod
    fun setupOuraIntegration(ouraClientID: String, callback: Callback) {
        print("Not implemented")
        callback.invoke()
    }
}