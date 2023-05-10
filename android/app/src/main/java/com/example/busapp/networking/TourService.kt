package com.example.busapp.networking

import com.example.busapp.models.TripData
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Query

interface TourService {

    @GET("search")
    fun searchTrip(
        @Query("departure") departure : String,
        @Query("destination") destination : String,
        @Query("date") date : String,
        @Query("quantity") quantity : Int
    ) : Call<List<TripData>>
}