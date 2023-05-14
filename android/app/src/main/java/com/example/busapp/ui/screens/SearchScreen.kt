@file:OptIn(ExperimentalComposeUiApi::class, ExperimentalMaterial3Api::class)

package com.example.busapp.ui.screens

import android.annotation.SuppressLint
import android.content.ContentValues.TAG
import android.icu.text.CaseMap.Title
import android.util.Log
import android.widget.Space
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.ScrollableState
import androidx.compose.foundation.gestures.scrollable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SheetState
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.layoutId
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.constraintlayout.compose.ChainStyle
import androidx.constraintlayout.compose.ConstraintLayout
import androidx.constraintlayout.compose.ConstraintSet
import androidx.constraintlayout.compose.Dimension
import androidx.core.graphics.createBitmap
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.example.busapp.components.TripRoute
import com.example.busapp.models.Coordinates
import com.example.busapp.models.Point
import com.example.busapp.models.SearchData
import com.example.busapp.models.TripData
import com.example.busapp.networking.Resource
import com.example.busapp.networking.TourManager
import com.marosseleng.compose.material3.datetimepickers.date.ui.dialog.DatePickerDialog
import kotlinx.coroutines.launch
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import kotlin.reflect.jvm.internal.impl.types.model.TypeSystemInferenceExtensionContext


@Composable
fun SearchScreen(navController: NavController, tourManager: TourManager) {
    val trips = tourManager.trips.value
    val cart = tourManager.cart.value
    val selectedTrip = tourManager.selectedTrip
    val scope = rememberCoroutineScope()
    val sheetState = rememberModalBottomSheetState(
        skipPartiallyExpanded = true
    )

    Scaffold(
        topBar = {
            Row(
                Modifier
                    .background(MaterialTheme.colorScheme.primary)
                    .fillMaxWidth()
                    .height(50.dp)
                    .padding(horizontal = 16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Spacer(modifier = Modifier
                    .fillMaxHeight()
                    .aspectRatio(1f))
                Text(
                    text = "Bus App",
                    modifier = Modifier.weight(1f),
                    fontSize = 22.sp,
                    textAlign = TextAlign.Center,
                    color = Color.DarkGray
                )
                Box(
                    Modifier
                        .fillMaxHeight()
                        .aspectRatio(1f)
                        .clickable {
                            navController.navigate("cart")
                        }
                ) {
                    Icon(
                        Icons.Default.ShoppingCart,
                        contentDescription = "Cart",
                        tint = Color.DarkGray,
                        modifier = Modifier.align(
                            Alignment.Center
                        )
                    )
                    if (cart.size > 0) {
                        Text(
                            text = cart.size.toString(),
                            fontSize = 12.sp,
                            modifier = Modifier
                                .align(Alignment.TopEnd)
                                .size(20.dp)
                                .aspectRatio(1f)
                                .clip(
                                    CircleShape
                                )
                                .background(Color.DarkGray),
                            textAlign = TextAlign.Center
                        )

                    }

                }
            }
        }
    ) { p ->
        val top = p.calculateTopPadding() + 16.dp
        LazyColumn(
            modifier = Modifier
                .padding(start = 16.dp, end = 16.dp, top = top, bottom = 16.dp)
                .fillMaxSize()
        ) {
            item {
                Card {
                    SearchForm(tourManager)
                }
                Spacer(modifier = Modifier.height(16.dp))
            }
            if (trips != null) {
                when (trips) {
                    is Resource.Loading -> {
                        /*Show Loading*/
                    }

                    is Resource.Success -> {
                        if (trips.data != null) {
                            items(trips.data) { trip ->
                                TripResultItem(trip = trip, onSelect = { selectedTrip ->
                                    tourManager.selectTrip(selectedTrip)
                                    scope.launch {
                                        sheetState.show()
                                    }
                                })
                                Spacer(modifier = Modifier.height(16.dp))
                            }
                        }
                    }

                    is Resource.Error -> {/*Show Error*/
                    }
                }
            }
        }
        TripDetails(trip = selectedTrip.value, state = sheetState,
            onDismissRequest = {
                tourManager.clearSelectedTrip()
                scope.launch {
                    sheetState.hide()
                }
            },
            onAddToCart = {
                scope.launch {
                    sheetState.hide()
                    tourManager.addCurrentTripToCart()
                }
            }
        )

    }
}

@Preview
@Composable
fun SearchScreenPreview(
) {
    SearchScreen(rememberNavController(), TourManager())
}

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
                value = if (searchData.quantity > 0) searchData.quantity.toString() else "",
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
                    .layoutId("quantity"),
                onValueChange = { v ->
                    searchData = if (v != "")
                        searchData.copy(quantity = v.toInt())
                    else
                        searchData.copy(quantity = 0)
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

private fun searchFormConstraint(margin: Dp = 16.dp) = ConstraintSet {
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

@Composable
fun TripResultItem(trip: TripData, onSelect: (TripData) -> Unit = {}) {
    Card(modifier = Modifier
        .fillMaxSize()
        .clickable { onSelect(trip) }) {
        BoxWithConstraints(modifier = Modifier.fillMaxSize()) {
            ConstraintLayout(
                tripResultItemConstraint(),
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp)
            ) {
                Text(
                    trip._id,
                    modifier = Modifier.layoutId("lineName"),
                    fontWeight = FontWeight.Bold,
                    fontSize = 18.sp
                )
                Text(
                    trip.operator,
                    modifier = Modifier.layoutId("operator"),
                    fontWeight = FontWeight.Light,
                )
                TripRoute(trip, Modifier.layoutId("tripRoute"))
                Text(trip.price.toString(), modifier = Modifier.layoutId("price"), fontSize = 24.sp)
            }
        }
    }
}

private fun tripResultItemConstraint(margin: Dp = 16.dp) = ConstraintSet {
    val lineName = createRefFor("lineName")
    val operator = createRefFor("operator")
    val tripRoute = createRefFor("tripRoute")
    val price = createRefFor("price")

    constrain(lineName) {
        top.linkTo(parent.top)
        start.linkTo(parent.start)
    }
    constrain(operator) {
        top.linkTo(lineName.bottom)
        start.linkTo(parent.start)
    }
    constrain(tripRoute){
        top.linkTo(operator.bottom, margin)
        start.linkTo(parent.start)
        end.linkTo(parent.end)
        width = Dimension.fillToConstraints
    }
    constrain(price) {
        top.linkTo(tripRoute.bottom, margin * 2)
        end.linkTo(parent.end)
        bottom.linkTo(parent.bottom)
    }
}

@Preview
@Composable
fun TripItemPreview() {
    Card(modifier = Modifier.height(200.dp)) {
        TripResultItem(
            trip = TripData.default
        )
    }
}


@Composable
fun TripDetails(
    trip: TripData?,
    state: SheetState,
    onDismissRequest: () -> Unit = {},
    onAddToCart: () -> Unit = {},
) {
    if (trip != null) {
        ModalBottomSheet(
            onDismissRequest = { onDismissRequest() },
            sheetState = state,
            modifier = Modifier.fillMaxHeight(0.8f)
        ) {
            BoxWithConstraints(Modifier.fillMaxSize()) {
                ConstraintLayout(
                    tripDetailsConstraint(),
                    Modifier
                        .fillMaxSize()
                        .padding(horizontal = 16.dp)
                ) {
                    Text(
                        text = trip._id,
                        modifier = Modifier.layoutId("lineName"),
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = trip.operator,
                        modifier = Modifier.layoutId("operator"),
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Light
                    )
                    Text(
                        text = "Trip Details",
                        modifier = Modifier.layoutId("lineDetailsTitle"),
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "21/11/1998",
                        modifier = Modifier.layoutId("tripDate"),
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Light
                    )

                    TripRoute(trip, modifier = Modifier.layoutId("tripRoute"))
                    Text(
                        text = "Features", modifier = Modifier.layoutId("featuresTitle"),
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Row(modifier = Modifier.layoutId("features")) {
                        trip.features.forEach { feature ->
                            Card(modifier = Modifier.clip(shape = RoundedCornerShape(10.dp))) {
                                Text(text = feature)
                            }
                        }
                    }

                    Text(
                        text = "1000000€",
                        modifier = Modifier.layoutId("price"),
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.primary
                    )
                    Button(
                        onClick = { onAddToCart() },
                        modifier = Modifier.layoutId("addToCartButton")
                    ) {
                        Text(text = "Add to Cart")
                    }
                }
            }
        }
    }
}

fun tripDetailsConstraint(margin: Dp = 16.dp) = ConstraintSet {
    val lineName = createRefFor("lineName")
    val operator = createRefFor("operator")
    val lineDetailsTitle = createRefFor("lineDetailsTitle")
    val date = createRefFor("tripDate")
    val tripRoute = createRefFor("tripRoute")
    val featuresTitle = createRefFor("featuresTitle")
    val features = createRefFor("features")
    val price = createRefFor("price")
    val addToCartButton = createRefFor("addToCartButton")



    constrain(lineName) {
        top.linkTo(parent.top)
        start.linkTo(parent.start)
        end.linkTo(parent.end)
        width = Dimension.fillToConstraints
    }

    constrain(operator) {
        top.linkTo(lineName.bottom)
        start.linkTo(parent.start)
        end.linkTo(parent.end)
        width = Dimension.fillToConstraints
    }
    constrain(lineDetailsTitle) {
        top.linkTo(operator.bottom, margin * 2)
        start.linkTo(parent.start)
        end.linkTo(parent.end)
        width = Dimension.fillToConstraints
    }

    constrain(date) {
        top.linkTo(lineDetailsTitle.bottom)
        start.linkTo(parent.start)
        end.linkTo(parent.end)
        width = Dimension.fillToConstraints
    }

    constrain(tripRoute){
        top.linkTo(date.bottom, margin)
        start.linkTo(parent.start)
        end.linkTo(parent.end)
    }
    constrain(featuresTitle) {
        top.linkTo(tripRoute.bottom, margin * 2)
        start.linkTo(parent.start)
        end.linkTo(parent.end)
        width = Dimension.fillToConstraints
    }
    constrain(features) {
        top.linkTo(featuresTitle.bottom, margin)
        start.linkTo(parent.start)
        end.linkTo(parent.end)
        width = Dimension.fillToConstraints
    }

    constrain(price) {
        end.linkTo(parent.end)
        top.linkTo(features.bottom, margin)
    }

    constrain(addToCartButton) {
        end.linkTo(parent.end)
        top.linkTo(price.bottom, margin / 2)
    }


}
