package com.pointsdkrn

import co.areyouonpoint.pointsdk.PointClient
import co.areyouonpoint.pointsdk.domain.exceptions.PointException
import co.areyouonpoint.pointsdk.domain.integrations.fitbit.FitbitScopes
import com.facebook.react.bridge.Promise
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

@OptIn(DelicateCoroutinesApi::class)
internal class PointSdkFitbit(private val pointClient: PointClient) {
    fun authenticateFitbit(scopes: List<String>, promise: Promise) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val fitbitScopes: List<FitbitScopes> = scopes.mapNotNull { fitbitScopesMapping(it) }
                    .ifEmpty { FitbitScopes.values().toList() }
                pointClient.fitbitIntegrationManager.authenticate(fitbitScopes)
                promise.resolve(true)
            } catch (ex: PointException) {
                promise.reject("PointSDKError", ex.message)
            }
        }
    }

    fun revokeFitbitAuthentication(promise: Promise) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                pointClient.fitbitIntegrationManager.revoke()
                promise.resolve(true)
            } catch (ex: PointException) {
                promise.reject("PointSDKError", ex.message)
            }
        }
    }

    fun isFitbitAuthenticated(promise: Promise) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val status = pointClient.fitbitIntegrationManager.getUserIntegrationStatus()
                val isAuthenticated = status?.active ?: false
                promise.resolve(isAuthenticated)
            } catch (ex: PointException) {
                promise.reject("PointSDKError", ex.message)
            }
        }
    }

    private fun fitbitScopesMapping(scope: String): FitbitScopes? {
        return when (scope) {
            "activity" -> FitbitScopes.Activity
            "heartrate" -> FitbitScopes.Heartrate
            "profile" -> FitbitScopes.Profile
            "sleep" -> FitbitScopes.Sleep
            "weight" -> FitbitScopes.Weight
            "cardio_fitness" -> FitbitScopes.CardioFitness
            "temperature" -> FitbitScopes.Temperature
            "respiratory_rate" -> FitbitScopes.RespiratoryRate
            "oxygen_saturation" -> FitbitScopes.OxygenSaturation
            else -> null
        }
    }
}
