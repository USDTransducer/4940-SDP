#include "arduino_secrets.h"
#include <NTPClient.h>
#include <WiFiNINA.h>
#include <ArduinoHttpClient.h>

char ssid[] = SECRET_SSID; // replace with your WiFi network name
char pass[] = SECRET_OPTIONAL_PASS; // replace with your WiFi network password
char server[] = "sheet.best"; // server address
int port = 443; // port number
int interval = 30;
int oldInterval = 0;
int type = 1;
String user = "system";
String oldUser;
unsigned long prevMillis;
unsigned long currentMillis;

WiFiSSLClient wifi; // use WiFiSSLClient for HTTPS connection
HttpClient client = HttpClient(wifi, server, port); // create HttpClient object
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);

void setup() {
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect
  }

  // Connect to WiFi network
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, pass);
  delay(5000);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
  
  timeClient.begin();
  timeClient.setTimeOffset(-14400);
  
}

int getType(String response) {
  int c = 0;
  int i1 = response.length() - 1;
  
  for(i1; c != 3; i1--) {
    if(response[i1] == ':') c++;
  }
  
  i1+=3;    //i1 == first index of interval
  
  int i2 = i1;  // i2 == second index
    while(response[i2] != '"') {
      i2 += 1;
  }
  
  String typeString = "";
  
  for(i1; i1 < i2; i1++) {
    typeString += response[i1];
  }
  
  return typeString.toInt();
}

int getInterval(String response) {
  int c = 0;
  int i1 = response.length() - 1;
  
  for(i1; c != 2; i1--) {
    if(response[i1] == ':') c++;
  }
  

  i1+=3;    //i1 == first index of interval
  
  int i2 = i1;  // i2 == second index
  while(response[i2] != '"') {
    i2 += 1;
  }
  
  
  String intervalString = "";
  
  for(i1; i1 < i2; i1++) {
    intervalString += response[i1];
  }
  
  if(intervalString.toInt() == -1) return interval;
  return intervalString.toInt();
}

String getUser(String response) {
  
  int c = 0;
  int i1 = response.length() - 1;
  
  for(i1; c != 1; i1--) {
    if(response[i1] == ':') c++;
  }
  

  i1+=3;    //i1 == first index of interval
  
  int i2 = i1;  // i2 == second index
  while(response[i2] != '"') {
    i2 += 1;
  }
  
  String userString = "";
  
  for(i1; i1 < i2; i1++) {
    userString += response[i1];
  }
  
  return userString;
  
}

String getDate() {
  String day;
  String month;
  long long epochTime = timeClient.getEpochTime();
  struct tm *ptm = localtime ((time_t *)&epochTime);
  
  int monthDay = ptm->tm_mday; // gets day of the month
  int currentMonth = ptm->tm_mon+1; // gets current month
  int currentYear = ptm->tm_year+1900; // gets current year
  
  if(monthDay < 10) day = "0" + String(monthDay); // format day
  else day = String(monthDay);
  
  if(currentMonth < 10) month = "0" + String(currentMonth); // format month
  else month = String(currentMonth);
  
  String date = String(currentYear) + "-" + month + "-" + day;
  return date;
  
}

void postRequest(String date, String time, float current, int systemType, int timerInterval, String systemUser) {
    // Create JSON payload
  String payload = "{";
  payload += "\"date\":\"" + date + "\",";
  payload += "\"time\":\"" + time + "\",";
  payload += "\"current\":" + String(current) + ",";
  payload += "\"type\":" + String(systemType) + ",";
  payload += "\"interval\":" + String(timerInterval) + ",";
  payload += "\"user\":\"" + systemUser + "\"";
  payload += "}";
  
  Serial.println(payload);
    
  
    // Send HTTP POST request
  client.post("/api/sheets/db0f2840-a783-4a03-999d-3aafd2b3539f", "application/json", payload);
    
    // Get HTTP response
  int statusCode = client.responseStatusCode();
  String response = client.responseBody();
  
    // Print HTTP response
  Serial.print("HTTP status code: ");
  Serial.println(statusCode);
  Serial.print("HTTP response: ");
  Serial.println(response);
    
    
  delay(1000);
}

String getResponse() {
  
  client.get("/api/sheets/eeff728c-9803-48ef-ab43-cb89a20a8ad1");
  
  
  String response = client.responseBody();
  
  return response;
}

void loop() {
  currentMillis = millis(); 
  timeClient.update();
  
  // interval = number of millisseconds 
  String clientResponse = getResponse(); 
  type = getType(clientResponse);


  if(type == -1) {
    oldInterval = interval;
    oldUser = user;
    
    String date = getDate();
    String time = timeClient.getFormattedTime();
    int randomnumber = 1235;
    int system_mode_number = -1;
    interval = -1;
    user = getUser(clientResponse);
    
    postRequest(date, time, randomnumber, system_mode_number, interval, user);
    
    interval = oldInterval;
    user = oldUser;
    
    String payload = "{";
    payload += "\"date\":\"" + date + "\",";
    payload += "\"time\":\"" + time + "\",";
    payload += "\"type\":\"1\",";
    payload += "\"interval\":\"" + String(interval) + "\",";
    payload += "\"user\":\"" + user + "\"";
    payload += "}";
    client.post("/api/sheets/eeff728c-9803-48ef-ab43-cb89a20a8ad1", "application/json", payload); // updates commands sheet so type -1 isn't repeating
    
      // Get HTTP response
    int statusCode = client.responseStatusCode();
    String response = client.responseBody();
    
      // Print HTTP response
    Serial.print("HTTP status code: ");
    Serial.println(statusCode);
    Serial.print("HTTP response: ");
    Serial.println(response);
  }
  
  if(type == 1) { 
    if(currentMillis - prevMillis >= interval*1000) {
      String date = getDate();
      String time = timeClient.getFormattedTime();
      int randomnumber = 1234;
      int system_mode_number = 1;
      interval = getInterval(clientResponse);
      user = getUser(clientResponse);
      
      postRequest(date, time, randomnumber, system_mode_number, interval, user);
      
      prevMillis = currentMillis;
    }
  }
  
  delay(3000);
}
