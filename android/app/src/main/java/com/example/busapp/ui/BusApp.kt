package com.example.busapp.ui

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.busapp.networking.TourManager
import com.example.busapp.ui.screens.CartScreen
import com.example.busapp.ui.screens.SearchScreen

@Composable
fun BusApp() {
    val navController = rememberNavController()
    MainScreen(navController)
}

@Composable
fun MainScreen(navController: NavHostController, tourManager: TourManager = TourManager()) {

    NavHost(navController = navController, startDestination = "search") {
        composable("search") { SearchScreen(navController, tourManager) }
        composable("cart") { CartScreen(navController, tourManager)}
    }
}
