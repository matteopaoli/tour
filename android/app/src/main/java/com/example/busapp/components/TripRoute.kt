package com.example.busapp.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Card
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.layoutId
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.constraintlayout.compose.ChainStyle
import androidx.constraintlayout.compose.ConstraintLayout
import androidx.constraintlayout.compose.ConstraintSet
import androidx.constraintlayout.compose.Dimension
import com.example.busapp.models.TripData

@Composable
fun TripRoute(
    trip: TripData,
    modifier: Modifier = Modifier
) {
    BoxWithConstraints(modifier.fillMaxWidth()) {
        ConstraintLayout(
            tripRouteConstraint(),
            modifier = modifier.fillMaxWidth()
        ) {
            Text(
                "09:18",
                modifier = Modifier.layoutId("departureTime"),
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
                "09:19",
                modifier = Modifier.layoutId("arrivalTime"),
                textAlign = TextAlign.Center,

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
                        radius = (size.width * 0.8f) / 2,
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
                            size.width / 2
                        ),
                        end = Offset(
                            size.width / 2,
                            (size.height - size.width / 2)
                        ),
                        strokeWidth = 10f
                    )

                    drawCircle(
                        radius = (size.width * 0.8f) / 2,
                        center = Offset(
                            size.width / 2,
                            (size.height - size.width / 2) - 10
                        ),
                        color = Color.Gray
                    )
                }
            )
        }
    }
}


private fun tripRouteConstraint(margin: Dp = 16.dp) = ConstraintSet {
    val departureLocation = createRefFor("departureLocation")
    val departureTime = createRefFor("departureTime")
    val arrivalLocation = createRefFor("arrivalLocation")
    val arrivalTime = createRefFor("arrivalTime")
    val tripLine = createRefFor("tripLine")

    val topChain = createHorizontalChain(
        departureTime,
        tripLine,
        departureLocation,
    )

    constrain(departureTime) {
        top.linkTo(parent.top)
        start.linkTo(parent.start)
        width = Dimension.fillToConstraints
        horizontalChainWeight = .2f
    }
    constrain(tripLine) {
        top.linkTo(parent.top)
        bottom.linkTo(parent.bottom)
        height = Dimension.fillToConstraints
        width = Dimension.fillToConstraints
        horizontalChainWeight = .05f
    }
    constrain(departureLocation) {
        top.linkTo(parent.top)
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
        start.linkTo(parent.start)
        end.linkTo(departureTime.end)
        bottom.linkTo(parent.bottom)
        width = Dimension.fillToConstraints
    }
}


@Preview
@Composable
fun TripRoutePreview(
) {
    Card(Modifier.size(360.dp, 640.dp)) {
        TripRoute(trip = TripData.default, modifier = Modifier.fillMaxWidth())
    }
}