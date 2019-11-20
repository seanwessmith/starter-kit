import React, { useState } from 'react';

const row = ({ title, defaultValue, type, onChange }) => (
  <div className="row">
    <p>{title}</p>
    <div className="value-container d-flex">
      <input
        onChange={({ target: { value }}) => onChange(value)}
        defaultValue={defaultValue}
      />
      <p>{type}</p>
    </div>
  </div>
)

const summary = (annualEnergy, annualCost) => (
  <div className="summary">
    <div className="row">
      <div className="d-flex h-center col-1-of-2">
        <h3>Annual Energy</h3>
      </div>
      <div className="summary-container d-flex">
        <p className="number">{annualEnergy.toFixed(2)}</p>
        <p>kWh</p>
      </div>
    </div>
    <div className="row">
      <div className="d-flex h-center col-1-of-2">
        <h3>Annual Cost</h3>
      </div>
      <div className="summary-container d-flex">
        <p className="number">{`$${annualCost.toFixed(2)}`}</p>
      </div>
    </div>
  </div>
)

const FanEnergy = () => {
  const [costOfElectricity, setCostOfElectricity] = useState(0.17);
  const [motorRatedPower, setMotorRatedPower] = useState(150);
  const [fanSpeed, setFanSpeed] = useState(80);
  const [runtime, setRuntime] = useState(2600);
  const [motorEfficiency, setMotorEfficiency] = useState(95);
  const [fanLoss, setFanLoss] = useState(2);
  const [show, setShow] = useState(false);

  const annualEnergy = Math.pow(motorRatedPower * (0.746) * (fanSpeed / 100), 2.4) * runtime;
  const annualCost = annualEnergy * costOfElectricity;

  return (
    <div className='fan-energy-calc'>
      <section className='header'>
        <h3>Fan Energy</h3>
      </section>
      <article className="d-flex">
        <section className="calculation-section">
          {row({
            title: 'Cost of Electricity',
            defaultValue: costOfElectricity,
            type: '/kWh',
            onChange: (v) => setCostOfElectricity(v),
          })}
          <br />
          {row({
            title: 'Motor Rated Power',
            defaultValue: motorRatedPower,
            type: 'Hp',
            onChange: (v) => setMotorRatedPower(v)
          })}
          {row({
            title: 'Fan Speed',
            defaultValue: fanSpeed,
            type: '%',
            onChange: (v) => setFanSpeed(v)
          })}
          {row({
            title: 'Runtime',
            defaultValue: runtime,
            type: 'hours',
            onChange: (v) => setRuntime(v)
          })}
          <br />
          {summary(annualEnergy, annualCost)}
          <br />
          <div className="row h-left">
            <p>Assumptions</p>
            <button onClick={() => setShow(!show)}>show</button>
          </div>
          {
            show ?
              <React.Fragment>
                {row({
                  title: 'Motor Efficiency',
                  defaultValue: motorEfficiency,
                  type: '%',
                  onChange: (v) => setMotorEfficiency(v)
                })}
                {row({
                  title: 'Fan Loss',
                  defaultValue: fanLoss,
                  type: '%',
                  onChange: (v) => setFanLoss(v)
                })}
              </React.Fragment>
              : null
          }
        </section>
        <section className="chart-section">
        </section>
      </article>
    </div>
  )
}

export default FanEnergy;
