package com.example.busapp.models

import android.os.Parcel
import android.os.Parcelable
import android.text.BoringLayout
import androidx.versionedparcelable.ParcelField
import java.io.Serializable
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.format.FormatStyle

data class SearchData(
    val departureLocation: String = "",
    val destinationLocation: String = "",
    val departureDate: LocalDate? = null,
    val isRoundTrip: Boolean = false,
    val returnDate: LocalDate? = null,
    val quantity: Int = 1,
) : Serializable {
    val departureDateString: String
        get() {
            return if (departureDate != null)
                departureDate.format(DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT))
            else
                ""
        }
    val returnDateString: String
        get() {
            return if (returnDate != null)
                returnDate.format(DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT))
            else
                ""
        }
    val isSearchDataValid: Boolean
        get() {
            return departureLocation != "" && departureDate != null && destinationLocation != ""
        }

    companion object {
        val default: SearchData = SearchData(
            departureLocation = "Bangkok Suvarnabhumi Airport",
            destinationLocation = "Bangkok train station",
            departureDate = LocalDate.parse(
                "01/03/2023",
                DateTimeFormatter.ofPattern("d/MM/yyyy")
            )
        )
    }

}
