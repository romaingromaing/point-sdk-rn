package com.pointsdkrn

import co.areyouonpoint.pointsdk.PointClient
import co.areyouonpoint.pointsdk.domain.PointEnvironment
import co.areyouonpoint.pointsdk.domain.exceptions.PointException
import com.facebook.react.bridge.*

class PointSdkRn(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    private lateinit var pointClient: PointClient
    private lateinit var pointSdkRepository: PointSdkRepository
    private val reactContext: ReactApplicationContext

    init {
        this.reactContext = reactContext
    }

    override fun getName() = "PointSdkRn"

    @ReactMethod
    fun setup(
        clientId: String,
        clientSecret: String,
        environment: String,
        verbose: Boolean,
        callback: Callback
    ) {
        pointClient = PointClient.getInstance(
            context = reactContext,
            clientId = clientId,
            clientSecret = clientSecret,
            apiEnvironment = environmentsMapping(environment)
        )
        pointSdkRepository = PointSdkRepository(pointClient.repository)
        callback.invoke()
    }

    @ReactMethod
    fun setUserToken(userToken: String, promise: Promise) {
        try {
            pointClient.setUserToken(userToken)
            promise.resolve(true)
        } catch (ex: PointException) {
            promise.reject("PointSDKError", ex.message)
        }
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

    /**
     * REPOSITORY/PUBLIC API
     */
    @ReactMethod
    fun getUserData(promise: Promise) {
        pointSdkRepository.getUserData(promise)
    }

    @ReactMethod
    fun getUserWorkouts(offset: Int?, promise: Promise) {
        pointSdkRepository.getUserWorkouts(offset ?: 0, promise)
    }

    @ReactMethod
    fun getDailyHistory(offset: Int?, promise: Promise) {
        pointSdkRepository.getDailyHistory(offset ?: 0, promise)
    }

    @ReactMethod
    fun getHealthMetrics(params: ReadableMap?, promise: Promise) {
        val filter = params?.getArray("filter")?.toHealthMetricTypes() ?: emptyList()
        val workoutId = params?.getNullableInt("workoutId")
        val date = params?.getString("date")?.fromIsoStringToDate()

        return pointSdkRepository.getHealthMetrics(filter, workoutId, date, promise)
    }

    @ReactMethod
    fun getInsights(params: ReadableMap?, promise: Promise) {
        val types = params?.getArray("types")?.toInsightTypes().orEmpty()
        val startDate = params?.getString("from")?.fromIsoStringToDate()
        val endDate = params?.getString("to")?.fromIsoStringToDate()
        val offset = params?.getNullableInt("offset")

        return pointSdkRepository.getInsights(types, startDate, endDate, offset, promise)
    }
}

private fun environmentsMapping(env: String): PointEnvironment {
    return when (env) {
        "development" -> PointEnvironment.DEVELOPMENT
        "staging" -> PointEnvironment.STAGING
        "production" -> PointEnvironment.PRODUCTION
        "preprod" -> PointEnvironment.PRE_PROD
        else -> PointEnvironment.DEVELOPMENT
    }
}

private fun ReadableMap.getNullableInt(name: String) =
    if (this.hasKey(name)) this.getInt(name) else null
