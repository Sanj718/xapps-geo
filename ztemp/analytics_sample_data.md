# Analytics Sample Data Examples

This file contains sample data for all analytics types used in the cron job testing and development.

## 📊 **Analytics Types Overview**

The system processes 4 types of analytics data:
- **data_button**: Button click analytics
- **data_auto**: Auto-redirect analytics  
- **data_markets_button**: Markets button analytics
- **data_markets_auto**: Markets auto-redirect analytics

## 🕐 **Timestamp Format**

- **Format**: Unix timestamp in milliseconds
- **Example**: `1755551935481` = January 17, 2025, 12:32:15 UTC
- **Separator**: Comma (`,`) between multiple timestamps
- **Retention**: 20 days (configured in cron job)

---

## 🚀 **Sample Data by Traffic Level**

### **High-Traffic Store (Many Analytics Events)**

```javascript
{
  shop: "high-traffic-store.myshopify.com",
  data_button: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485,1755551935486,1755551935487,1755551935488,1755551935489,1755551935490,1755551935491,1755551935492,1755551935493,1755551935494,1755551935495",
  data_auto: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485,1755551935486,1755551935487,1755551935488,1755551935489,1755551935490",
  data_markets_button: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485,1755551935486,1755551935487,1755551935488",
  data_markets_auto: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485,1755551935486"
}
```

### **Medium-Traffic Store (Moderate Analytics Events)**

```javascript
{
  shop: "medium-traffic-store.myshopify.com",
  data_button: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485,1755551935486,1755551935487,1755551935488",
  data_auto: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485",
  data_markets_button: "1755551935481,1755551935482,1755551935483,1755551935484",
  data_markets_auto: "1755551935481,1755551935482,1755551935483"
}
```

### **Low-Traffic Store (Few Analytics Events)**

```javascript
{
  shop: "low-traffic-store.myshopify.com",
  data_button: "1755551935481,1755551935482,1755551935483",
  data_auto: "1755551935481,1755551935482",
  data_markets_button: "1755551935481",
  data_markets_auto: ""
}
```

### **New Store (Minimal Analytics Events)**

```javascript
{
  shop: "new-store.myshopify.com",
  data_button: "1755551935481",
  data_auto: "",
  data_markets_button: "",
  data_markets_auto: ""
}
```

### **Inactive Store (No Analytics Events)**

```javascript
{
  shop: "inactive-store.myshopify.com",
  data_button: "",
  data_auto: "",
  data_markets_button: "",
  data_markets_auto: ""
}
```

---

## 🧪 **Testing Scenarios**

### **Scenario 1: Mixed Activity Levels**
```javascript
{
  shop: "mixed-activity-store.myshopify.com",
  data_button: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485,1755551935486,1755551935487,1755551935488,1755551935489,1755551935490",
  data_auto: "1755551935481,1755551935482,1755551935483",
  data_markets_button: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485",
  data_markets_auto: "1755551935481"
}
```

### **Scenario 2: Button-Heavy Store**
```javascript
{
  shop: "button-heavy-store.myshopify.com",
  data_button: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485,1755551935486,1755551935487,1755551935488,1755551935489,1755551935490,1755551935491,1755551935492,1755551935493,1755551935494,1755551935495,1755551935496,1755551935497,1755551935498,1755551935499,1755551935500",
  data_auto: "1755551935481,1755551935482",
  data_markets_button: "1755551935481",
  data_markets_auto: ""
}
```

### **Scenario 3: Auto-Redirect Focused Store**
```javascript
{
  shop: "auto-redirect-store.myshopify.com",
  data_button: "1755551935481,1755551935482",
  data_auto: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485,1755551935486,1755551935487,1755551935488,1755551935489,1755551935490,1755551935491,1755551935492,1755551935493,1755551935494,1755551935495",
  data_markets_button: "1755551935481,1755551935482,1755551935483",
  data_markets_auto: "1755551935481,1755551935482"
}
```

### **Scenario 4: Markets-Focused Store**
```javascript
{
  shop: "markets-focused-store.myshopify.com",
  data_button: "1755551935481,1755551935482,1755551935483",
  data_auto: "1755551935481,1755551935482",
  data_markets_button: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485,1755551935486,1755551935487,1755551935488,1755551935489,1755551935490",
  data_markets_auto: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485,1755551935486,1755551935487,1755551935488"
}
```

---

## 📅 **Historical Data Examples**

### **Recent Data (Within 20 Days)**
```javascript
{
  shop: "recent-activity-store.myshopify.com",
  data_button: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485",
  data_auto: "1755551935481,1755551935482,1755551935483",
  data_markets_button: "1755551935481,1755551935482",
  data_markets_auto: "1755551935481"
}
```

### **Mixed Recent and Historical Data**
```javascript
{
  shop: "mixed-history-store.myshopify.com",
  data_button: "1750000000000,1751000000000,1752000000000,1753000000000,1754000000000,1755000000000,1755551935481,1755551935482,1755551935483,1755551935484,1755551935485",
  data_auto: "1750000000000,1751000000000,1752000000000,1753000000000,1754000000000,1755000000000,1755551935481,1755551935482,1755551935483",
  data_markets_button: "1750000000000,1751000000000,1752000000000,1753000000000,1754000000000,1755000000000,1755551935481,1755551935482",
  data_markets_auto: "1750000000000,1751000000000,1752000000000,1753000000000,1754000000000,1755000000000,1755551935481"
}
```

---

## 🔧 **Usage Instructions**

### **For Testing:**
1. Copy any sample data above
2. Replace the test data in `test_analytics_logic.js`
3. Run the test: `node test_analytics_logic.js`
4. Verify the 20-day retention logic works correctly

### **For Development:**
1. Use these samples to test different scenarios
2. Modify timestamps to test edge cases
3. Test with empty strings for inactive analytics types
4. Verify SQL generation works correctly

### **For Production:**
1. These samples represent realistic data patterns
2. Use as reference for expected data formats
3. Help understand different store activity levels
4. Guide testing and validation efforts

---

## 📝 **Notes**

- **Timestamps**: All timestamps are recent (within last few days/weeks)
- **Format**: Comma-separated values in string format
- **Empty Data**: Use empty string `""` for no activity
- **Retention**: 20-day retention period applied to all data types
- **Processing**: Each analytics type is processed independently

---

*Last Updated: January 2025*
*Retention Period: 20 days*
*Analytics Types: 4 (button, auto, markets_button, markets_auto)*
