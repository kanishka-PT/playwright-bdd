Feature: ECP Canvas Prints Regression

 
  Scenario Outline:Canvas Prints category regression

    Given user launch <Store> in local
    #Given user launch <Store> in BS

    When User hover over Canvas category in Top Navigation
    Then User clicks on Canvas Prints Sub-Category under Canvas Prints category
    Then user selects 'Size 8x8' from the Pricing Grid
    Then User lands on ECP CDex Page

    Examples:
      | Store                                   |
      | "https://www.easycanvasprints.com/" |