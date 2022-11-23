package com.pointsdkrn

import co.areyouonpoint.pointsdk.domain.PointRepository
import co.areyouonpoint.pointsdk.domain.model.GoalAnswers
import co.areyouonpoint.pointsdk.domain.model.SpecificGoalAnswers
import com.facebook.react.bridge.Promise
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch


@OptIn(DelicateCoroutinesApi::class)
internal class PointSDKRepository(
        private val pointRepository: PointRepository,
) {
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