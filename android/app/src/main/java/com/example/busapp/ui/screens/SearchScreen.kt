package com.example.busapp.ui.screens

import android.annotation.SuppressLint
import android.content.ContentValues.TAG
import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.layoutId
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.constraintlayout.compose.ConstraintLayout
import androidx.constraintlayout.compose.ConstraintSet
import androidx.constraintlayout.compose.Dimension
import androidx.navigation.NavController
import com.example.busapp.models.SearchData
import com.example.busapp.networking.TourManager
import com.marosseleng.compose.material3.datetimepickers.date.ui.dialog.DatePickerDialog
import java.time.LocalDate
import java.time.format.DateTimeFormatter


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SearchScreen(navController: NavController, tourManager: TourManager) {
    Scaffold() { p ->
        p
        Card (modifier = Modifier.padding(16.dp)){
            SearchForm(tourManager)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class, ExperimentalComposeUiApi::class)
@Composable
fun SearchForm(tourManager: TourManager) {


    var searchData by remember { mutableStateOf(SearchData.default) }
    var isDepartureDateDialogOpen by remember { mutableStateOf(false) }
    var isReturnDateDialogOpen by remember { mutableStateOf(false) }

    val focusRequester = remember { FocusRequester() }
    val focusManager = LocalFocusManager.current


    BoxWithConstraints(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        ConstraintLayout(searchFormConstraint()) {
            OutlinedTextField(
                value = searchData.departureLocation,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
                    .layoutId("departureLocation"),
                onValueChange = {
                    searchData = searchData.copy(departureLocation = it)
                },
                label = { Text(text = "Departure location") })
            OutlinedTextField(
                value = searchData.destinationLocation,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
                    .layoutId("destinationLocation"),
                onValueChange = {
                    searchData = searchData.copy(destinationLocation = it)
                },
                label = { Text(text = "Destination location") })
            OutlinedTextField(
                value = searchData.departureDateString,
                readOnly = true,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
                    .layoutId("departureDate")
                    .focusRequester(focusRequester)

                    .onFocusChanged {
                        if (it.isFocused) {
                            isDepartureDateDialogOpen = true
                        }
                    },
                onValueChange = {},
                label = { Text(text = "Departure date") })
            if (searchData.returnDate == null) {
                OutlinedTextField(
                    value = "Tap to add",
                    readOnly = true,
                    trailingIcon = { Icon(Icons.Default.Add, contentDescription = "Add") },
                    textStyle = TextStyle(fontSize = 14.sp),

                    modifier = Modifier
                        .fillMaxWidth()
                        .focusRequester(focusRequester)
                        .padding(vertical = 4.dp)
                        .layoutId("returnDate")
                        .onFocusChanged {
                            if (it.isFocused) {
                                isReturnDateDialogOpen = true
                            }
                        },
                    onValueChange = {},
                    label = { Text(text = "Return Date") })
            } else {
                OutlinedTextField(
                    value = searchData.returnDateString,
                    readOnly = true,
                    trailingIcon = {
                        Icon(
                            Icons.Default.Close,
                            contentDescription = "Add",
                            modifier = Modifier.clickable {
                                searchData = searchData.copy(returnDate = null)
                            })
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .focusRequester(focusRequester)
                        .padding(vertical = 4.dp)
                        .layoutId("returnDate")
                        .onFocusChanged {
                            if (it.isFocused) {
                                isDepartureDateDialogOpen = true
                            }
                        },
                    onValueChange = {},
                    label = { Text(text = "Return Date") })
            }
            OutlinedTextField(
                value = searchData.quantity.toString(),
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
                    .layoutId("quantity"),
                onValueChange = { v ->
                    searchData = searchData.copy(quantity = v.toInt())
                },
                label = { Text(text = "Departure date") })
            Button(
                onClick = { tourManager.searchTrips(searchData) },
                modifier = Modifier.layoutId("searchButton")
            ) {
                Text(text = "Search", fontSize = 20.sp)
            }
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

fun searchFormConstraint(margin: Dp = 16.dp) = ConstraintSet {
    val departureLocation = createRefFor("departureLocation")
    val destinationLocation = createRefFor("destinationLocation")
    val departureDate = createRefFor("departureDate")
    val returnDate = createRefFor("returnDate")
    val quantity = createRefFor("quantity")
    val searchButton = createRefFor("searchButton")
    val middleGuideline = createGuidelineFromStart(0.5f)

    constrain(departureLocation) {
        top.linkTo(parent.top, margin)
        start.linkTo(parent.start, margin)
        end.linkTo(parent.end, margin)
    }

    constrain(destinationLocation) {
        top.linkTo(departureLocation.bottom, margin / 2)
        start.linkTo(departureLocation.start)
        end.linkTo(departureLocation.end)
    }

    constrain(departureDate) {
        top.linkTo(destinationLocation.bottom, margin / 2)
        start.linkTo(departureLocation.start)
        width = Dimension.fillToConstraints
        end.linkTo(middleGuideline, margin / 2)


    }

    constrain(returnDate) {
        top.linkTo(destinationLocation.bottom, margin / 2)
        end.linkTo(departureLocation.end)
        width = Dimension.fillToConstraints
        start.linkTo(middleGuideline, margin / 2)
    }

    constrain(quantity) {
        top.linkTo(returnDate.bottom, margin / 2)
        start.linkTo(departureLocation.start)
        end.linkTo(departureLocation.end)
    }

    constrain(searchButton) {
        top.linkTo(quantity.bottom, margin / 2)
        start.linkTo(departureLocation.start)
        end.linkTo(departureLocation.end)
    }
}

@Preview
@Composable
fun SearchFormPreview() {
    Card(modifier = Modifier.background(Color.Black)) {
        SearchForm(TourManager())
    }
}
