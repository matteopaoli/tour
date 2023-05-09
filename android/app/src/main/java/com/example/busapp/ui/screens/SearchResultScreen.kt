package com.example.busapp.ui.screens

import android.os.Build
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.navigation.NavController
import com.example.busapp.models.SearchData

@Composable
fun SearchResultScreen(navController: NavController, searchData: SearchData) {
    Text(text = searchData.toString())
}