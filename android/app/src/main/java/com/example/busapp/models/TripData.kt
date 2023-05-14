package com.example.busapp.models

data class TripData(
    val _id: String,
    val name : String = _id,
    val quantity : Int = 0,
    val dateEnd: String,
    val dateStart: String,
    val features: List<String>,
    val `operator`: String,
    val points: List<Point>,
    val price: Int,
    val seatsAvailable: Int
){
    companion object{
        val default = TripData(
            _id = "123123123123",
            operator = "Paoli Airlines",
            dateEnd = "",
            dateStart = "",
            points = listOf(Point(Coordinates(0.0, 0.0), "Airport", "")),
            features = listOf(""),
            price = 1000,
            seatsAvailable = 12,
        )
    }

}