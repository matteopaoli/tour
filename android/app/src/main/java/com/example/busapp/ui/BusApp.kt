package com.example.busapp.ui

import android.os.Build
import androidx.compose.foundation.ScrollState
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.Navigation
import androidx.navigation.Navigator
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.busapp.models.SearchData
import com.example.busapp.ui.screens.SearchResultScreen
import com.example.busapp.ui.screens.SearchScreen

@Composable
fun BusApp() {
    val navController = rememberNavController()
    MainScreen(navController)
}

@Composable
fun MainScreen(navController: NavHostController) {
    NavHost(navController = navController, startDestination = "search", ){


        composable("search"){ SearchScreen(navController)}
        composable("search-result"){
            print(navController.previousBackStackEntry?.destination?.route)
            print(navController.previousBackStackEntry?.destination?.route)

            val searchData =navController.previousBackStackEntry?.savedStateHandle?.get<SearchData>("search-data")
            SearchResultScreen(navController, searchData?: SearchData())}
    }
}
