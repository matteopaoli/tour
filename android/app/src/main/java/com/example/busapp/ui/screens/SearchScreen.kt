@file:OptIn(ExperimentalComposeUiApi::class, ExperimentalMaterial3Api::class)

package com.example.busapp.ui.screens

import android.annotation.SuppressLint
import android.content.ContentValues.TAG
import android.util.Log
import android.widget.Space
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.ScrollableState
import androidx.compose.foundation.gestures.scrollable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Close
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
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
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
    val sheetState = rememberModalBottomSheetState()
    Scaffold() { p ->
        p
        LazyColumn(
            modifier = Modifier
                .padding(16.dp)
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
                Text(
                    "09:18",
                    modifier = Modifier.layoutId("departureTime"),
                    textAlign = TextAlign.End,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    "09:19",
                    modifier = Modifier.layoutId("arrivalTime"),
                    textAlign = TextAlign.End,
                    fontWeight = FontWeight.Bold

                )
                Text(
                    trip.points.first().name,
                    modifier = Modifier.layoutId("departureLocation"),
                    maxLines = 2
                )
                Text(
                    trip.points.last().name,
                    modifier = Modifier
                        .layoutId("arrivalLocation"),
                    maxLines = 2
                )
                Canvas(
                    modifier = Modifier
                        .layoutId("tripLine"),
                    onDraw = {
                        drawCircle(
                            radius = (size.width * 0.9f) / 2,
                            center = Offset(
                                size.width / 2,
                                size.width / 2 + 10
                            ),
                            color = Color.Gray
                        )
                        drawLine(
                            color = Color.Gray,
                            start = Offset(
                                size.width / 2,
                                size.width / 2 + 10
                            ),
                            end = Offset(
                                size.width / 2,
                                (size.height - size.width / 2) - 10
                            ),
                            strokeWidth = 10f
                        )

                        drawCircle(
                            radius = (size.width * 0.9f) / 2,
                            center = Offset(
                                size.width / 2,
                                (size.height - size.width / 2) - 10
                            ),
                            color = Color.Gray
                        )
                    }
                )
                Text(trip.price.toString(), modifier = Modifier.layoutId("price"), fontSize = 24.sp)
            }
        }
    }
}

private fun tripResultItemConstraint(margin: Dp = 16.dp) = ConstraintSet {
    val lineName = createRefFor("lineName")
    val operator = createRefFor("operator")
    val departureLocation = createRefFor("departureLocation")
    val departureTime = createRefFor("departureTime")
    val arrivalLocation = createRefFor("arrivalLocation")
    val arrivalTime = createRefFor("arrivalTime")
    val tripLine = createRefFor("tripLine")
    val price = createRefFor("price")

    val topChain = createHorizontalChain(
        departureTime,
        tripLine,
        departureLocation,
        chainStyle = ChainStyle.Spread
    )

    constrain(lineName) {
        top.linkTo(parent.top)
        start.linkTo(parent.start)
    }
    constrain(operator) {
        top.linkTo(lineName.bottom)
        start.linkTo(parent.start)
    }
    constrain(departureTime) {
        top.linkTo(operator.bottom, margin * 2)
        start.linkTo(parent.start)
        width = Dimension.fillToConstraints
        horizontalChainWeight = .2f
    }
    constrain(tripLine) {
        top.linkTo(departureTime.top)
        start.linkTo(departureTime.end, margin / 2)
        bottom.linkTo(arrivalLocation.bottom)
        height = Dimension.fillToConstraints
        width = Dimension.fillToConstraints
        horizontalChainWeight = .05f
    }
    constrain(departureLocation) {
        top.linkTo(departureTime.top)
        start.linkTo(tripLine.end, margin / 2)
        end.linkTo(parent.end)
        width = Dimension.fillToConstraints
        horizontalChainWeight = .75f
    }
    constrain(arrivalLocation) {
        end.linkTo(parent.end)
        top.linkTo(departureLocation.bottom, margin)
        start.linkTo(departureLocation.start)
        width = Dimension.fillToConstraints

    }

    constrain(arrivalTime) {
        start.linkTo(departureTime.start)
        end.linkTo(departureTime.end)
        bottom.linkTo(tripLine.bottom)
        width = Dimension.fillToConstraints

    }

    constrain(price) {
        top.linkTo(arrivalLocation.bottom, margin * 2)
        end.linkTo(parent.end)
        bottom.linkTo(parent.bottom)
    }
}

@Preview
@Composable
fun TripItemPreview() {
    Card(modifier = Modifier.height(200.dp)) {
        TripResultItem(
            trip = TripData(
                _id = "123123123123",
                operator = "Paoli Airlines",
                dateEnd = "",
                dateStart = "",
                points = listOf(Point(Coordinates(0.0, 0.0), "Airport", "")),
                features = listOf(""),
                price = 1000,
                seatsAvailable = 12
            )
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
                    Text(
                        "09:18",
                        modifier = Modifier.layoutId("departureTime"),
                        textAlign = TextAlign.Center,

                        )
                    Text(
                        "09:19",
                        modifier = Modifier.layoutId("arrivalTime"),
                        textAlign = TextAlign.Center,

                        )
                    Text(
                        trip.points.first().name,
                        modifier = Modifier
                            .layoutId("departureLocation")
                            .padding(start = 8.dp),
                        maxLines = 2
                    )
                    Text(
                        trip.points.last().name,
                        modifier = Modifier
                            .layoutId("arrivalLocation")
                            .padding(start = 8.dp),
                        maxLines = 2
                    )
                    Canvas(
                        modifier = Modifier
                            .layoutId("tripLine"),
                        onDraw = {
                            drawCircle(
                                radius = (size.width * 0.9f) / 2,
                                center = Offset(
                                    size.width / 2,
                                    size.width / 2 + 10
                                ),
                                color = Color.Gray
                            )
                            drawLine(
                                color = Color.Gray,
                                start = Offset(
                                    size.width / 2,
                                    size.width / 2 + 10
                                ),
                                end = Offset(
                                    size.width / 2,
                                    (size.height - size.width / 2) - 10
                                ),
                                strokeWidth = 10f
                            )

                            drawCircle(
                                radius = (size.width * 0.9f) / 2,
                                center = Offset(
                                    size.width / 2,
                                    (size.height - size.width / 2) - 10
                                ),
                                color = Color.Gray
                            )
                        }
                    )

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
    val departureLocation = createRefFor("departureLocation")
    val departureTime = createRefFor("departureTime")
    val arrivalLocation = createRefFor("arrivalLocation")
    val arrivalTime = createRefFor("arrivalTime")
    val tripLine = createRefFor("tripLine")
    val featuresTitle = createRefFor("featuresTitle")
    val features = createRefFor("features")
    val price = createRefFor("price")
    val addToCartButton = createRefFor("addToCartButton")

    val topChain = createHorizontalChain(
        departureTime,
        tripLine,
        departureLocation,
        chainStyle = ChainStyle.Spread
    )


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

    constrain(departureTime) {
        top.linkTo(date.bottom, margin)
        start.linkTo(parent.start)
        width = Dimension.fillToConstraints
        horizontalChainWeight = .2f
    }
    constrain(tripLine) {
        top.linkTo(departureTime.top)
        start.linkTo(departureTime.end)
        bottom.linkTo(arrivalLocation.bottom)
        height = Dimension.fillToConstraints
        width = Dimension.fillToConstraints
        horizontalChainWeight = .05f
    }
    constrain(departureLocation) {
        top.linkTo(departureTime.top)
        start.linkTo(tripLine.end)
        end.linkTo(parent.end)
        width = Dimension.fillToConstraints
        horizontalChainWeight = .75f
    }
    constrain(arrivalLocation) {
        end.linkTo(parent.end)
        top.linkTo(departureLocation.bottom, margin)
        start.linkTo(departureLocation.start)
        width = Dimension.fillToConstraints

    }

    constrain(arrivalTime) {
        start.linkTo(departureTime.start)
        end.linkTo(departureTime.end)
        bottom.linkTo(tripLine.bottom)
        width = Dimension.fillToConstraints
    }
    constrain(featuresTitle) {
        top.linkTo(arrivalTime.bottom, margin * 2)
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
