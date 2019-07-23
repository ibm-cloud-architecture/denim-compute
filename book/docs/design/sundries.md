# DBA solution design findings

---

## Case Design

### Leveraging case persistence
The claims solution implements a Policy case which is persisted as a record to represent the insurance policy. The Policy case type stores the policy information and claims are generated from the policy by a *create claim* activity, which creates the new claim case and also transfer existing policy information into the claim.

### Case data model and business objects
The Case data model currently does not fully support Business Objects, therefore an intering solution have been implemented to map properties.
The interface of the Case Manager data model with other BAW components may require the implementation of distinct case properties to match each element of a business object. A new upcoming version of Case Manager will fully support business objects and allow better data integration with other BAW components.

---

