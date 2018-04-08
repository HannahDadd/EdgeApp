package com.edgeapp;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.firebase.iid.FirebaseInstanceId;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

/**
 * Created by dads on 23/03/2018.
 */

public class Follow extends ReactContextBaseJavaModule {

    public Follow(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void follow(String id) {
        try {
            URL url = new URL("http://theedgesusu.co.uk/pnfw/categories/");
            URLConnection conn = url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestProperty( "Content-type", "application/x-www-form-urlencoded");
            String data = "token=" + FirebaseInstanceId.getInstance().getToken() +
                    "&os=android&id=" + id + "&exclude=false";

            OutputStreamWriter writer = new OutputStreamWriter(conn.getOutputStream());

            writer.write(data);
            writer.flush();
            String line;
            BufferedReader reader = new BufferedReader(new
                    InputStreamReader(conn.getInputStream()));
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            writer.close();
            reader.close();
        } catch(IOException e){
            System.out.println(e.getStackTrace());
        }
    }

    @Override
    public String getName() {
        return "Follow";
    }
}
