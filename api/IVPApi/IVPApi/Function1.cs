
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs.Host;
using Newtonsoft.Json;

namespace IVPApi
{
    public static class Function1
    {
        [FunctionName("Function1")]
        public static IActionResult Run([HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)]HttpRequest req, out object ivpClientDocument, TraceWriter log)
        {
            log.Info("C# HTTP trigger function processed a request Testing.");

            string requestBody = new StreamReader(req.Body).ReadToEnd();
            dynamic data = JsonConvert.DeserializeObject(requestBody);

            ivpClientDocument = data;

            if (data != null)
            {
                return (ActionResult)new OkResult();
            }
            else
            {
                return new BadRequestObjectResult("Please pass a name on the query string or in the request body");
            }
        }
    }
}
