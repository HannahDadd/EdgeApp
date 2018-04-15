package com.edgeapp;

import android.os.Build;
import android.support.annotation.RequiresApi;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.google.firebase.iid.FirebaseInstanceId;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
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
    public void getToken(Callback errorCallback, Callback successCallback){
        try {
            successCallback.invoke(FirebaseInstanceId.getInstance().getToken());
            //successCallback.invoke("Hi");
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }

    }

    @ReactMethod
    public void breakingNewsReg(){
        try {
            Log.d("EdgeApp","hi");
            URL url = new URL("http://theedgesusu.co.uk/pnfw/categories/");
            HttpURLConnection httpURLConnection = (HttpURLConnection)url.openConnection();
            httpURLConnection.setDoOutput(true);
            httpURLConnection.setRequestMethod("POST");
            httpURLConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            httpURLConnection.connect();

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("token", FirebaseInstanceId.getInstance().getToken());
            jsonObject.put("os", "android");
            jsonObject.put("id", 4039);
            jsonObject.put("exclude", false);

            DataOutputStream wr = new DataOutputStream(httpURLConnection.getOutputStream());
            wr.writeBytes(jsonObject.toString());
            wr.flush();
            wr.close();
        } catch(IOException e){
            System.out.println(e.getStackTrace());
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    private void sendRegistrationToServer() {
        try {
            URL url = new URL("https://www.theedgesusu.co.uk/pnfw/register/");
            HttpURLConnection httpURLConnection = (HttpURLConnection)url.openConnection();
            httpURLConnection.setDoOutput(true);
            httpURLConnection.setRequestMethod("POST");
            httpURLConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            httpURLConnection.connect();

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("token", FirebaseInstanceId.getInstance().getToken());
            jsonObject.put("os", "android");
            jsonObject.put("id", 4039);
            jsonObject.put("exclude", false);

            DataOutputStream wr = new DataOutputStream(httpURLConnection.getOutputStream());
            wr.writeBytes(jsonObject.toString());
            wr.flush();
            wr.close();
        } catch(IOException e){
            System.out.println(e.getStackTrace());
        } catch (JSONException e) {
            e.printStackTrace();
        }
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
