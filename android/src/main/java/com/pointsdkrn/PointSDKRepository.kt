package com.pointsdkrn

import co.areyouonpoint.pointsdk.domain.PointRepository
import co.areyouonpoint.pointsdk.domain.exceptions.PointException
import co.areyouonpoint.pointsdk.domain.model.GoalAnswers
import co.areyouonpoint.pointsdk.domain.model.SpecificGoalAnswers
import com.facebook.react.bridge.Promise
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

@OptIn(DelicateCoroutinesApi::class)
internal class PointSdkRepository(
    private val pointRepository: PointRepository,
) {

    fun getUserData(promise: Promise) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val user = pointRepository.getUser()?.toResponse()
                promise.resolve(user)
            } catch (ex: PointException) {
                promise.reject("PointSDKError", ex.message)
            }
        }
    }

fun setUserGoal(goal: String, promise: Promise) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val result = pointRepository.setUserGoal(GoalAnswers.safeValueOf(goal)!!)
                promise.resolve(result)
            } catch (ex: Exception) {
                promise.reject("PointSDKError",ex.message)
            }
        }
    }

    fun setUserSpecificGoal(specificGoal: String, promise: Promise) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val result = pointRepository.setUserSpecificGoal(SpecificGoalAnswers.safeValueOf(specificGoal)!!)
                promise.resolve(result)
            } catch (ex: Exception) {
                promise.reject("PointSDKError",ex.message)
            }
        }
    }
}