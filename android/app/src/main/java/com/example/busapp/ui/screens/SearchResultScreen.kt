package com.example.busapp.ui.screens

import android.os.Build
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.navigation.NavController
import com.example.busapp.models.SearchData
import com.example.busapp.models.TripData
import com.example.busapp.networking.Resource
import com.example.busapp.networking.TourManager

@Composable
fun SearchResultScreen(navController: NavController, tourManager: TourManager) {

    val trips = tourManager.trips.value
    if (trips != null){
        when(trips){
            is Resource.Error -> {
                Text(text = "Error: ${trips.message}")
            }
            is Resource.Loading -> {
                Text(text = "Loading")
            }
            is Resource.Success -> {
                LazyColumn(){
                    items(trips.data!!){trip ->
                        SearchResultItem(trip)
                    }
                }
            }
        }
    }
}

@Composable
fun SearchResultItem(
    trip : TripData
) {

}

