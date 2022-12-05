package com.pointsdkrn

import co.areyouonpoint.pointsdk.PointClient
import co.areyouonpoint.pointsdk.domain.exceptions.PointException
import co.areyouonpoint.pointsdk.domain.integrations.oura.OuraScopes
import com.facebook.react.bridge.Promise
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

@OptIn(DelicateCoroutinesApi::class)
internal class PointSdkOura(private val pointClient: PointClient) {
    fun authenticateOura(scopes: List<String>, promise: Promise) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val ouraScopes: List<OuraScopes> = scopes.mapNotNull { ouraScopesMapping(it) }
                    .ifEmpty { OuraScopes.values().toList() }
                pointClient.ouraIntegrationManager.authenticate(ouraScopes)
                promise.resolve(true)
            } catch (ex: PointException) {
                promise.reject("PointSDKError", ex.message)
            }
        }
    }

    fun revokeOuraAuthentication(promise: Promise) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                pointClient.ouraIntegrationManager.revoke()
                promise.resolve(true)
            } catch (ex: PointException) {
                promise.reject("PointSDKError", ex.message)
            }
        }
    }

    fun isOuraAuthenticated(promise: Promise) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val status = pointClient.ouraIntegrationManager.getUserIntegrationStatus()
                val isAuthenticated = status?.active ?: false
                promise.resolve(isAuthenticated)
            } catch (ex: PointException) {
                promise.reject("PointSDKError", ex.message)
            }
        }
    }

    private fun ouraScopesMapping(scope: String) = when (scope) {
        "personal" -> OuraScopes.Personal
        "daily" -> OuraScopes.Daily
        "heartrate" -> OuraScopes.Heartrate
        "workout" -> OuraScopes.Workout
        "session" -> OuraScopes.Session
        else -> null
    }
}
