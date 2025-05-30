package com.example.odialearningapp

import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient

class MainActivity : AppCompatActivity() {

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main) // Sets the layout from activity_main.xml

        val myWebView: WebView = findViewById(R.id.myWebView)

        // Configure WebView settings
        myWebView.settings.javaScriptEnabled = true // Enable JavaScript

        // Set a WebViewClient to handle links within the WebView
        myWebView.webViewClient = object : WebViewClient() {
            @Deprecated("Deprecated in Java")
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                // Load all links within the WebView itself
                url?.let { view?.loadUrl(it) }
                return true // Indicates that the WebView handles the URL loading
            }
        }

        // Load the index.html file from the assets folder
        // The path "file:///android_asset/" is a special path to access the assets directory
        myWebView.loadUrl("file:///android_asset/index.html")
    }

    // Optional: Handle back button press to navigate WebView history
    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        val myWebView: WebView = findViewById(R.id.myWebView)
        if (myWebView.canGoBack()) {
            myWebView.goBack() // If WebView can go back, navigate back in history
        } else {
            super.onBackPressed() // Otherwise, perform default back button action (exit app)
        }
    }
}
