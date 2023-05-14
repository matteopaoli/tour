package com.example.busapp.networking

import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import com.example.busapp.models.SearchData
import com.example.busapp.models.TripData
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter

class TourManager {
    private val _trips = mutableStateOf<Resource<List<TripData>>?>(null)
    val trips: State<Resource<List<TripData>>?>
        @Composable get() = remember {
            _trips
        }

    private val _searchData = mutableStateOf(SearchData())
    val searchData: State<SearchData>
        @Composable get() = remember {
            _searchData
        }

    private val _cart = mutableStateOf(listOf<TripData>())
    val cart: State<List<TripData>>
        @Composable get() = remember {
            _cart
        }

    private val _selectedTrip = mutableStateOf<TripData?>(null)
    val selectedTrip: State<TripData?>
        @Composable get() = remember {
            _selectedTrip
        }

    fun selectTrip(tripData: TripData){
        _selectedTrip.value = tripData
    }
    fun clearSelectedTrip(){
        _selectedTrip.value = null
    }
    fun searchTrips(newSearchData: SearchData) {
        _trips.value = Resource.Loading()
        _searchData.value = newSearchData
        val dateTime = newSearchData.departureDate?.atStartOfDay() ?: LocalDateTime.now()
        val service = API.retrofitService.searchTrip(
            newSearchData.departureLocation,
            newSearchData.destinationLocation,
            dateTime.toInstant(ZoneOffset.MIN).toString(),
            1
        )
        service.enqueue(object : Callback<List<TripData>> {
            override fun onResponse(
                call: Call<List<TripData>>,
                response: Response<List<TripData>>
            ) {
                if (response.isSuccessful) {
                    _trips.value = Resource.Success(response.body()!!)
                } else {
                    _trips.value = Resource.Error(response.errorBody().toString())
                }
            }

            override fun onFailure(call: Call<List<TripData>>, t: Throwable) {
                _trips.value = Resource.Error(message = t.message ?: "Generic error")
            }
        })
    }

    fun addCurrentTripToCart(){
        if (_selectedTrip.value != null){
            val result = mutableListOf<TripData>()
            result.addAll(_cart.value)
            result.add(_selectedTrip.value!!.copy(quantity = _searchData.value.quantity))
            _cart.value = result.toList()
            _selectedTrip.value = null
        }
    }

    fun removeTripFromCart(i:Int){

    }
}