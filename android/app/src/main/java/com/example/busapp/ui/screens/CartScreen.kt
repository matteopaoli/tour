package com.example.busapp.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.Card
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.layoutId
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.constraintlayout.compose.ConstraintLayout
import androidx.constraintlayout.compose.ConstraintSet
import androidx.navigation.NavController
import com.example.busapp.components.TripRoute
import com.example.busapp.models.TripData
import com.example.busapp.networking.TourManager

@Composable
fun CartScreen(navController: NavController, tourManager: TourManager) {

    val cart = tourManager.cart.value
    Scaffold(topBar = {
        Row(
            Modifier
                .background(MaterialTheme.colorScheme.primary)
                .fillMaxWidth()
                .height(50.dp)
                .padding(horizontal = 16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Spacer(
                modifier = Modifier
                    .fillMaxHeight()
                    .aspectRatio(1f)
            )
            Text(
                text = "Cart",
                modifier = Modifier.weight(1f),
                fontSize = 22.sp,
                textAlign = TextAlign.Center,
                color = Color.DarkGray
            )
            IconButton(onClick = { navController.popBackStack() }) {
                Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = Color.DarkGray)
            }
        }
    }
    ) { p ->

        val top = p.calculateTopPadding() + 16.dp
        LazyColumn(
            modifier = Modifier.padding(top = top, start = 16.dp, end = 16.dp)
        ) {
            items(cart) { item ->
                CartItem(trip = item)
                Spacer(modifier = Modifier.height(16.dp))
            }
        }
    }
}

@Composable
fun CartItem(
    trip: TripData
) {
    Card(modifier = Modifier.fillMaxWidth()) {
        BoxWithConstraints(modifier = Modifier.fillMaxWidth()) {
            ConstraintLayout(
                cardItemConstraint(),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(8.dp)
            ) {
                Text(
                    text = trip._id,
                    modifier = Modifier.layoutId("lineName"),
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = trip.operator,
                    modifier = Modifier.layoutId("operator"),
                    fontWeight = FontWeight.Light
                )
                Text(
                    text = trip.quantity.toString(),
                    modifier = Modifier.layoutId("quantity"),
                    fontSize = 20.sp
                )
                Icon(Icons.Default.Person, "", modifier = Modifier.layoutId("quantityIcon"))
                TripRoute(trip, modifier = Modifier.layoutId("tripRoute"))
                Text(
                    text = trip.price.toString(),
                    modifier = Modifier.layoutId("price"),
                    fontSize = 25.sp,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                )
            }
        }
    }
}


private fun cardItemConstraint(margin: Dp = 16.dp) = ConstraintSet {
    val lineName = createRefFor("lineName")
    val operator = createRefFor("operator")
    val quantity = createRefFor("quantity")
    val quantityIcon = createRefFor("quantityIcon")
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

    constrain(quantity) {
        top.linkTo(lineName.top)
        bottom.linkTo(operator.bottom)
        end.linkTo(quantityIcon.start)
    }
    constrain(quantityIcon) {
        top.linkTo(lineName.top)
        bottom.linkTo(operator.bottom)
        end.linkTo(parent.end)
    }

    constrain(tripRoute) {
        top.linkTo(operator.bottom, margin)
        start.linkTo(parent.start)
        end.linkTo(parent.end)
    }

    constrain(price) {
        top.linkTo(tripRoute.bottom, margin)
        bottom.linkTo(parent.bottom)
        end.linkTo(parent.end)
    }

}