package com.example.busapp.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.Card
import androidx.compose.material3.Checkbox
import androidx.compose.material3.ElevatedButton
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FabPosition
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.example.busapp.models.SearchData
import com.marosseleng.compose.material3.datetimepickers.date.ui.dialog.DatePickerDialog
import java.time.LocalDate

@OptIn(ExperimentalMaterial3Api::class, ExperimentalComposeUiApi::class)
@Composable
fun SearchScreen(navController: NavController) {
    var searchData by remember { mutableStateOf(SearchData()) }
    var isDepartureDateDialogOpen by remember { mutableStateOf(false) }
    var isReturnDateDialogOpen by remember { mutableStateOf(false) }

    val focusRequester = remember { FocusRequester() }
    val focusManager = LocalFocusManager.current


    Scaffold(
        floatingActionButton = {
            ElevatedButton(
                onClick = {
                    navController.currentBackStackEntry?.savedStateHandle?.set("search-data", searchData)
                    navController.navigate("search-result") },
                shape = CircleShape,
                //enabled = searchData.isSearchDataValid
                ) {
                Icon(
                    Icons.Default.Search, contentDescription = "Search", modifier = Modifier.size(40.dp))
            }
        },
        floatingActionButtonPosition = FabPosition.Center
    ) { p ->
        p
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(8.dp)
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 8.dp)
            ) {
                Text(
                    text = "BusApp",
                    style = MaterialTheme.typography.headlineLarge,
                    modifier = Modifier.padding(16.dp)
                )
                OutlinedTextField(
                    value = searchData.departureLocation,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 4.dp),
                    onValueChange = {
                        searchData = searchData.copy(departureLocation = it)
                    },
                    label = { Text(text = "Departure location") })
                OutlinedTextField(
                    value = searchData.destinationLocation,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 4.dp),
                    onValueChange = {
                        searchData = searchData.copy(destinationLocation = it)
                    },
                    label = { Text(text = "Destination location") })
                OutlinedTextField(
                    modifier = Modifier
                        .focusRequester(focusRequester)
                        .fillMaxWidth()
                        .padding(vertical = 4.dp)
                        .onFocusChanged {
                            if (it.isFocused) {
                                isDepartureDateDialogOpen = true
                            }
                        },
                    value = searchData.departureDateString,
                    readOnly = true,
                    onValueChange = {},
                    label = { Text(text = "Departure date") }
                )
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 4.dp)
                ) {
                    Checkbox(
                        checked = searchData.isRoundTrip,
                        onCheckedChange = { searchData = searchData.copy(isRoundTrip = it) })
                    Text(text = "Round trip")

                }
                OutlinedTextField(
                    enabled = searchData.isRoundTrip,
                    modifier = Modifier
                        .focusRequester(focusRequester)
                        .fillMaxWidth()
                        .padding(vertical = 4.dp)
                        .onFocusChanged {
                            if (it.isFocused) {
                                isReturnDateDialogOpen = true
                            }
                        },
                    value = searchData.returnDateString,
                    readOnly = true,
                    onValueChange = {},
                    label = { Text(text = "Return date") }
                )
            }
        }
        if (isDepartureDateDialogOpen) {
            DatePickerDialog(
                initialDate = searchData.departureDate ?: LocalDate.now(),
                title = {
                    Text(
                        text = "Departure Date",
                        style = MaterialTheme.typography.headlineSmall
                    )
                },
                onDismissRequest = {
                    isDepartureDateDialogOpen = false
                    focusManager.clearFocus()
                }, onDateChange = {
                    isDepartureDateDialogOpen = false
                    searchData = searchData.copy(departureDate = it)
                    focusManager.clearFocus()
                })
        }

        if (isReturnDateDialogOpen) {
            DatePickerDialog(
                initialDate = searchData.returnDate ?: LocalDate.now(),
                title = {
                    Text(
                        text = "Return Date",
                        style = MaterialTheme.typography.headlineSmall
                    )
                },
                onDismissRequest = {
                    isReturnDateDialogOpen = false
                    focusManager.clearFocus()
                }, onDateChange = {
                    isReturnDateDialogOpen = false
                    searchData = searchData.copy(returnDate = it)
                    focusManager.clearFocus()
                })
        }
    }
}

@Preview
@Composable
fun SearchScreenPreview() {
    MaterialTheme() {
        SearchScreen(rememberNavController())
    }
}