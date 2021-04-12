    /**
    * Disserialize json
    */
    public static T Deserialize<T>(string json) where T : new()
        {
            try
            {
                var obj = JsonConvert.DeserializeObject<T>(json, Settings);
                return obj;
            }
            catch (Exception ex)
            {
                Log.WriteLog($"Error: Failed to deserialize json string into a valid object___{ex.Message}");
                throw new Exception($"Error: Failed to deserialize json string into a valid object___{ex.Message}");
            }
        }