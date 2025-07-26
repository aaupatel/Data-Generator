import { Language } from "../../types";
import { getFaker } from "../../faker/instances";

export function generateTravelValue(fieldId: string, language: Language): string {
  const faker = getFaker(language);

  switch (fieldId) {
    case "flightNumber":
      return faker.helpers.arrayElement(['AA', 'UA', 'DL', 'BA', 'LH']) + 
             faker.number.int({ min: 100, max: 9999 });
    case "departure":
      return faker.location.city() + ' (' + 
             faker.helpers.fromRegExp('[A-Z]{3}') + ')';
    case "arrival":
      return faker.location.city() + ' (' + 
             faker.helpers.fromRegExp('[A-Z]{3}') + ')';
    case "departureDate":
      return faker.date.future({ years: 1 }).toISOString().split('T')[0];
    case "arrivalDate": {
      const date = faker.date.future({ years: 1 });
      date.setDate(date.getDate() + faker.number.int({ min: 0, max: 2 }));
      return date.toISOString().split('T')[0];
    }
    case "airline":
      return faker.helpers.arrayElement([
        'American Airlines',
        'United Airlines',
        'Delta Air Lines',
        'British Airways',
        'Lufthansa',
        'Emirates',
        'Air France',
        'Singapore Airlines'
      ]);
    case "seatNumber":
      return faker.number.int({ min: 1, max: 50 }) + 
             faker.helpers.arrayElement(['A', 'B', 'C', 'D', 'E', 'F']);
    case "bookingReference":
      return faker.helpers.fromRegExp('[A-Z0-9]{6}');
    case "ticketClass":
      return faker.helpers.arrayElement([
        'Economy',
        'Premium Economy',
        'Business',
        'First'
      ]);
    case "terminal":
      return 'Terminal ' + faker.helpers.arrayElement(['1', '2', '3', '4', '5', 'A', 'B', 'C']);
    case "gate":
      return faker.helpers.fromRegExp('[A-E][0-9]{1,2}');
    case "baggage":
      return faker.number.int({ min: 0, max: 3 }) + ' pieces';
    case "mealPreference":
      return faker.helpers.arrayElement([
        'Regular',
        'Vegetarian',
        'Vegan',
        'Halal',
        'Kosher',
        'Diabetic',
        'Gluten-free'
      ]);
    case "frequentFlyerNumber":
      return faker.helpers.fromRegExp('[A-Z]{2}[0-9]{8}');
    default:
      return faker.lorem.word();
  }
}