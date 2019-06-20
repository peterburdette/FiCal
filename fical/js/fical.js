/*
 @name      FiCal
 @author    Peter Burdette
 @version   1.0
 @license   Released under the MIT license.
*/

$(function () {
	$('#submit').click(function() {
		var name = $('#name'),
				age = $('#age'),
				retAge = $('#retAge'),
				retPackage = $('#retPackage'),
				contribution = $('#annualContribution'),
				rate = $('#annualRateReturn'),
				summary = $('#summary'),
				display = $('#chart');
		var nameVal = name.val(),
				ageVal = age.val(),
				retAgeVal = retAge.val(),
				minRetAge = 59.5,
				workingYears = retAgeVal - ageVal,
				retPackageVal = parseFloat(retPackage.val()),
				contributionVal = parseFloat(contribution.val()),
				rateVal = parseFloat(rate.val());
		
		// Global form validation logic
		if (nameVal === '' || ageVal === '' || ageVal > retAgeVal || retAgeVal === '' || retAgeVal < ageVal || retAgeVal < minRetAge || isNaN(retPackageVal) || isNaN(contributionVal) || isNaN(rateVal)) {

			// Hides DOM response after unsuccessful form submission
			summary.hide();
			display.hide();

			// Checks for empty name	
			name.toggleClass('error', nameVal ==='');

			// Checks for empty age or if age is greater than retirement age
			age.toggleClass('error', ageVal === '' || ageVal > retAgeVal);

			// Checks for empty retirement age or if retirement age is less than age
			retAge.toggleClass('error', retAgeVal === '' || retAgeVal < ageVal || retAgeVal < minRetAge);

			// Checks for empty current 401(k) value
			retPackage.toggleClass('error', isNaN(retPackageVal));

			// Checks for empty annual contribution
			contribution.toggleClass('error', isNaN(contributionVal));

			// Checks for empty annual rate of return
			rate.toggleClass('error', isNaN(rateVal));

		} else {
			// Create data object instance
			var data = [];
			
			// Removes error styling from all fields on successful submission
			$('input[type="text"], input[type="number"]').removeClass('error');
			
			// Clears DOM response after every successful form submission and shows the new/updated response
			summary.show();
			display.html('').show();

			// Displays overview message
			summary.text('Hello, ' + nameVal + '!  Assuming you are able to annually contribute ' + contributionVal.toLocaleString(undefined, { style: 'currency', currency: 'USD' }) + ' with an average annual rate of return of ' + parseInt(rateVal) + '%, the estimated value of your 401(k) over the course of the next ' + workingYears + ' years will look like this:');

			// 401(k) calculation logic
			for (ageVal; ageVal < retAgeVal; ageVal++) {
				var compoundInterest = (retPackageVal + contributionVal) * (rateVal / 100);
				var retPackageVal = retPackageVal + contributionVal + compoundInterest;
				var parsedAge = parseInt(ageVal) + 1;

				// Adds the age and 401(k) values to the data object
				data.push({
					'age': parsedAge,
					'401k': retPackageVal.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
				});
			}
		}

		// Start chart

		// Apply chart themes
		am4core.useTheme(am4themes_animated);
		am4core.useTheme(am4themes_kelly);

		// Add data
		var chart = am4core.create('chart', am4charts.XYChart);
		
		chart.data = data;

		// Create axes
		var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
		categoryAxis.dataFields.category = 'age';
		categoryAxis.title.text = 'Age';
		categoryAxis.renderer.grid.template.location = 0;
		categoryAxis.renderer.minGridDistance = 20;

		var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.title.text = 'Portfolio Value ($)';
		valueAxis.totalText = 'Total: [[total]]';
		
		// Create series
		var series = chart.series.push(new am4charts.ColumnSeries());
		series.dataFields.valueY = '401k';
		series.dataFields.categoryX = "age";
		series.name = '401(k)';
		//series3.tooltipText = "{name}: [bold]{valueY}[/]";
		series.stacked = true;


		/* Add a single HTML-based tooltip to first series */
		series.tooltipHTML = `<div class="heading-color"><center><strong><span class="heading-color">Estimated Portfolio Value at Age : {categoryX}</span></strong></center></div>
	<hr />
	<table class="table-color">
	<tr>
	<th align="left">401(k) value : </th>
	<td>{401k}</td>
	</tr>
	</table>`;
		series.tooltip.label.interactionsEnabled = true;
		series.tooltip.pointerOrientation = 'vertical';
		// add color to fill tooltip
		series.tooltip.getFillFromObject = false;
		series.tooltip.background.fill = am4core.color('#fff');
		series.tooltip.background.cornerRadius = 0;
		series.tooltip.strokeWidth = 0;
		series.tooltip.getFillFromObject = false;

		// Add cursor
		chart.cursor = new am4charts.XYCursor();

		// Add legend
		chart.legend = new am4charts.Legend();

		// End chart
	})
});