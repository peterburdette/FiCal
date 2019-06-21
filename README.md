# FiCal

FiCal is a basic 401(k) financial calculator that accepts a series of parameters, calculates the return on investment for year after year and then displays the information to the user in a chart along with a summary.

## Algorithm

This calculator uses a simple algorithm to calculate the annual 401(k) portfolio value per year.  There are three parameters which are accepted from the user that are used in this formula along with one constant: Retirement Package Value, Annual Contribution, Annual Rate of Return and Compound Interest.  Compound Interest is the constant that is applied to the `retPackageVal` after the current portfolio value and contribution value have been totaled.

### Retirement Package Value

The retirement pacakge value is a user entered parameter.  It is the current portfolio value of the 401(k).

### Annual Contribution

The annual contribution is a user entered parameter.  It is the maximum contribution made to the 401(k) over the course of a year.  As of 2019, the maximum annual contribution one can make to their 401(k) is $19,500 USD.

### Annual Rate of Return

The annual rate of return is a user entered parameter.  It is the net gain or loss on an investment over the course of a year and is expressed as a percentage of the investment's initial cost.  As of 2019, the average annual rate of return for 401(k) investments over the last 20 years has been between 6-8%.

### Compound Interest

Compound interest is the addition of interest to the principal sum of, in this case, a deposit.  It is the result of reinvesting interest, rather than paying it out, so that interest in the next period is then earned on the principal sum plus previously accumulated interest.

**Compound Interest Formula**

```html
var compoundInterest = (retPackageVal + contributionVal) * (rateVal / 100);
```

### Retirement Package Value

The retirement package value is a user entered parameter.  It is the total sum of the previous retirement package value added to the contribution and compound interest values.

**Retirement Package Value Formula**

```html
var retPackageVal = retPackageVal + contributionVal + compoundInterest;
```

## Form Fields

<table>
  <tr>
    <th>Field Name</th>
    <th>Type</th>
    <th>Min</th>
    <th>Max</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Name</td>
    <td>String</td>
    <td>n/a</td>
    <td>n/a</td>
    <td>Your name.</td>
  </tr>
  <tr>
    <td>Age</td>
    <td>Integer</td>
    <td>14</td>
    <td>∞</td>
    <td>The age where you start contributing to your 401(k).</td>
  </tr>
  <tr>
    <td>Age of Retirement</td>
    <td>Integer</td>
    <td>59.5</td>
    <td>∞</td>
    <td>The age at which you plan on retiring.  The minimum age for an individual to start withdrawing from their 401(k) without a heavy penalty is 59.5 years.</td>
  </tr>
  <tr>
    <td>Current 401(k) Value</td>
    <td>Integer</td>
    <td>0</td>
    <td>∞</td>
    <td>The current value of your 401(k).</td>
  </tr>
  <tr>
    <td>Annual Contribution</td>
    <td>Integer</td>
    <td>0</td>
    <td>19,500</td>
    <td>The amount you plan on annually contributing. The maximum annual contribution one can make to a 401(k) as of 2019 is $19,500 USD.</td>
  </tr>
  <tr>
    <td>Annual Rate of Return</td>
    <td>Integer</td>
    <td>0</td>
    <td>∞</td>
    <td>The annual average rate of return upon which the value of your 401(k) will grow due to compound interest. Historically this number has been between 6-8%.</td>
  </tr>
</table>

## Demo

See the demo on <a href="https://jsfiddle.net/fwnug7dr/1/">JSFiddle</a>.

## Browser Support

*Supported Browsers* : Chrome, Firefox, Safari, Opera, Edge, IE11.

## License

The source code can be found on [github](https://github.com/peterburdette/FiCal) and is licensed under the [MIT](http://opensource.org/licenses/mit-license.php) license.

Developed by [Peter Burdette](https://www.linkedin.com/in/peter-burdette-76976552)
