package com.pointsdkrn

import co.areyouonpoint.pointsdk.PointClient
import co.areyouonpoint.pointsdk.domain.PointEnvironment
import co.areyouonpoint.pointsdk.domain.exceptions.PointException
import co.areyouonpoint.pointsdk.domain.model.GoalAnswers
import co.areyouonpoint.pointsdk.domain.model.SpecificGoalAnswers
import com.facebook.react.bridge.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

class PointSdkRn(private val context: ReactApplicationContext) :
    ReactContextBaseJavaModule(context) {
    private lateinit var pointClient: PointClient
    private lateinit var pointSdkRepository: PointSdkRepository
    private lateinit var pointSdkOura: PointSdkOura
    private lateinit var pointSdkFitbit: PointSdkFitbit

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
            context = context,
            clientId = clientId,
            clientSecret = clientSecret,
            apiEnvironment = environmentsMapping(environment)
        )
        pointSdkRepository = PointSdkRepository(pointClient.repository)
        pointSdkOura = PointSdkOura(pointClient)
        pointSdkFitbit = PointSdkFitbit(pointClient)
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
    fun setRefreshToken(refreshToken: String, userId: String, promise: Promise) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                pointClient.setRefreshToken(refreshToken = refreshToken, id = userId)
                promise.resolve(true)
            } catch (ex: PointException) {
                promise.reject("PointSDKError", ex.message)
            }
        }
    }

    @ReactMethod
    fun logout() {
        pointClient.logout()
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

    /**
     * FITBIT
     */
    @ReactMethod
    fun setupFitbitIntegration(@Suppress("UNUSED_PARAMETER") fitbitClientID: String, callback: Callback) {
        print("setupFitbitIntegration is deprecated -  Since version 1.3.0, it's no longer necessary to set up each integration manually, this in now done automatically when setting up the SDK.")
        callback.invoke()
    }

    @ReactMethod
    fun authenticateFitbit(
        @Suppress("UNUSED_PARAMETER") callbackURLScheme: String?,
        fitbitScopes: ReadableArray?,
        promise: Promise
    ) {
        val scopesAsNames = fitbitScopes?.toArrayList()?.mapNotNull { it.toString() } ?: emptyList()
        pointSdkFitbit.authenticateFitbit(scopesAsNames, promise)
    }

    @ReactMethod
    fun revokeFitbitAuthentication(promise: Promise) {
        pointSdkFitbit.revokeFitbitAuthentication(promise)
    }

    @ReactMethod
    fun isFitbitAuthenticated(promise: Promise) {
        pointSdkFitbit.isFitbitAuthenticated(promise)
    }

    /**
     * OURA
     */
    @ReactMethod
    fun setupOuraIntegration(
        @Suppress("UNUSED_PARAMETER") ouraClientID: String,
        callback: Callback
    ) {
        print("setupOuraIntegration is deprecated - Since version 1.3.0, it's no longer necessary to set up each integration manually, this in now done automatically when setting up the SDK.")
        callback.invoke()
    }

    @ReactMethod
    fun authenticateOura(
        @Suppress("UNUSED_PARAMETER") callbackURLScheme: String?,
        ouraScopes: ReadableArray?,
        promise: Promise
    ) {
        val scopesAsNames = ouraScopes?.toArrayList()?.mapNotNull { it.toString() } ?: emptyList()
        pointSdkOura.authenticateOura(scopesAsNames, promise)
    }

    @ReactMethod
    fun revokeOuraAuthentication(promise: Promise) {
        pointSdkOura.revokeOuraAuthentication(promise)
    }

    @ReactMethod
    fun isOuraAuthenticated(promise: Promise) {
        pointSdkOura.isOuraAuthenticated(promise)
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
    fun getUserWorkoutById(id: Int, promise: Promise) {
        pointSdkRepository.getUserWorkoutById(id, promise)
    }

    @ReactMethod
    fun getWorkoutRecommendations(date: String, promise: Promise) {
        pointSdkRepository.getWorkoutRecommendations(date.fromIsoStringToDate(), promise)
    }

    @ReactMethod
    fun saveWorkoutRecommendation(id: Int, promise: Promise) {
        return pointSdkRepository.saveWorkoutRecommendation(id, promise)
    }

    @ReactMethod
    fun getDailyHistory(offset: Int?, promise: Promise) {
        pointSdkRepository.getDailyHistory(offset ?: 0, promise)
    }

    @ReactMethod
    fun setUserGoal(goal: String, promise: Promise) {
        val goalAnswer = GoalAnswers.safeValueOf(goal)!!
        pointSdkRepository.setUserGoal(goalAnswer, promise)
    }

    @ReactMethod
    fun setUserSpecificGoal(specificGoal: String, promise: Promise) {
        val specificGoalAnswer = SpecificGoalAnswers.safeValueOf(specificGoal)!!
        pointSdkRepository.setUserSpecificGoal(specificGoalAnswer, promise)
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

    @ReactMethod
    fun rateWorkout(id: Int, ratings: ReadableMap, promise: Promise) {
        val workoutRatings = ratings.toWorkoutRatings()

        return pointSdkRepository.rateWorkout(id, workoutRatings, promise)
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
