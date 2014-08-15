// --------------------------------------------------------------------------------------------------------------------
// <copyright file="BundleConfig.cs" company="">
//   Copyright © 2014 
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace App.CrossfitWestValley
{
    using System.Web.Optimization;

    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            #region ~/Content/css
            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/site.css",
                "~/Content/ng-grid.css",
                "~/Content/toastr.css",
                "~/Content/boostrap/bootstrap.css",
                "~/Content/boostrap/bootstrap-theme.css",
                "~/content/app.css"));
            #endregion

            bundles.Add(new ScriptBundle("~/js/jquery").Include("~/scripts/vendor/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/js/app").Include(
                "~/scripts/vendor/angular.js",
                "~/scripts/vendor/angular-ui-router.js",
                "~/app/*.js",
                "~/app/filters/*.js",
                "~/app/services/*.js",
                "~/app/directives/*.js",
                "~/app/controllers/*.js",
                "~/app/factories/*.js",
                "~/app/models/*.js"));

            bundles.Add(new ScriptBundle("~/js/toastr").Include(
                        "~/Scripts/toastr.js"));


        }
    }
}
