package com.example.busapp.models

data class TripData(
    val _id: String,
    val dateEnd: String,
    val dateStart: String,
    val features: List<String>,
    val `operator`: String,
    val points: List<Point>,
    val price: Int,
    val seatsAvailable: Int
)