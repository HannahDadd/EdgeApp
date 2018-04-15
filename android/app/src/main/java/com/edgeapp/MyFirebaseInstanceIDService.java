package com.edgeapp;

import android.os.Build;
import android.support.annotation.RequiresApi;

import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceIdService;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;

/**
 * Created by dads on 09/03/2018.
 */

public class MyFirebaseInstanceIDService extends FirebaseInstanceIdService {

    private static final String TAG = "MyFirebaseIIDService";

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @Override
    public void onTokenRefresh() {
        // Get updated InstanceID token.
        String refreshedToken = FirebaseInstanceId.getInstance().getToken();
        sendRegistrationToServer(refreshedToken);
        breakingNewsReg();
    }

    public void breakingNewsReg(){
        try {
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

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    private void sendRegistrationToServer(String token) {
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
}
